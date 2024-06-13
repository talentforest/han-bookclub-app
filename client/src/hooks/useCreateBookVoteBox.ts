import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { formatHyphenDate } from 'util/index';
import {
  IBookVote,
  IBookVoteItem,
  bookVotesState,
  initialBookVoteItem,
  votesState,
} from 'data/voteAtom';
import { BOOK_VOTE } from 'constants/index';
import useAlertAskJoin from './useAlertAskJoin';
import useSendPushNotification from './useSendPushNotification';

interface Props {
  onToggleModal: () => void;
}

const useCreateBookVoteBox = ({ onToggleModal }: Props) => {
  const userData = useRecoilValue(currentUserState);
  const previousVotes = useRecoilValue(votesState);
  const bookVotes = useRecoilValue(bookVotesState);

  const initialVoteItem = {
    id: 1,
    book: { title: '', thumbnail: '', url: '' },
    voteCount: 0,
    selectReason: '',
  };

  const allVotesLength = previousVotes?.length + bookVotes.length;

  const initialVote: IBookVote = {
    voteId: allVotesLength + 1,
    title: '',
    createdAt: Date.now(),
    creatorId: userData.uid,
    deadline: formatHyphenDate(new Date()),
    voteItems: [initialVoteItem, { ...initialVoteItem, id: 2 }],
  };

  const [newVote, setNewVote] = useState(initialVote);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('register');

  const { sendVotePushNotification } = useSendPushNotification();

  const setDocVote = async () => {
    const document = doc(dbService, BOOK_VOTE, `VoteId_${newVote.voteId}`);
    await setDoc(document, newVote);
  };

  const onNewVoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();
    if (newVote.title === '') return;

    const findNoBookInfo = newVote.voteItems.find(
      (voteItem) => voteItem.book.title === ''
    );

    if (findNoBookInfo) return alert('투표 항목이 모두 작성되지 않았습니다!');

    try {
      setDocVote();
      window.alert('투표가 성공적으로 등록되었습니다!');
      onToggleModal();
      // 모든 유저에게 알림 보내기
      sendVotePushNotification({
        voteTitle: newVote.title,
        subPath: `/vote/${newVote.voteId}`,
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onVoteTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const vote = { ...newVote, title: event.currentTarget.value };
    setNewVote(vote);
  };

  const onDateChange = (date: Date) => {
    const vote = { ...newVote, deadline: formatHyphenDate(date) };
    setNewVote(vote);
  };

  const onAddVoteItemBtn = () => {
    const newVoteItems: { voteItems: IBookVoteItem[] } = {
      voteItems: [
        ...newVote.voteItems,
        {
          ...initialBookVoteItem,
          id: newVote.voteItems.length + 1,
        },
      ],
    };

    setNewVote((prev) => {
      return { ...prev, ...newVoteItems };
    });
  };

  const onDeleteVoteItemClick = (voteId: number) => {
    const filteredVoteItems: IBookVoteItem[] = newVote.voteItems.filter(
      ({ id }) => id !== voteId
    );

    const a =
      voteId === 3 && newVote.voteItems.length === 4
        ? filteredVoteItems.map((voteItem) =>
            voteItem.id === 4 ? { ...voteItem, id: 3 } : voteItem
          )
        : filteredVoteItems;

    setNewVote((prev) => {
      return { ...prev, voteItems: a };
    });
  };

  return {
    newVote,
    setNewVote,
    onNewVoteSubmit,
    onVoteTitleChange,
    onDateChange,
    onAddVoteItemBtn,
    onDeleteVoteItemClick,
  };
};

export default useCreateBookVoteBox;
