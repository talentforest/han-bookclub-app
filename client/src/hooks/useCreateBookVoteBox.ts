import { useState } from 'react';

import { currAuthUserAtom } from 'data/userAtom';
import {
  IBookVote,
  IBookVoteItem,
  bookVotesState,
  initialBookVoteItem,
} from 'data/voteAtom';
import { useRecoilValue } from 'recoil';

import useAlertAskJoin from './useAlertAskJoin';
// import useSendPushNotification from './useSendPushNotification';
import { BOOK_VOTE } from 'appConstants';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { formatDate } from 'utils';

interface Props {
  onToggleModal: () => void;
}

const useCreateBookVoteBox = ({ onToggleModal }: Props) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const bookVotes = useRecoilValue(bookVotesState);

  const allVotesLength = bookVotes.length;

  const initialVoteItem = {
    id: 1,
    book: { title: '', thumbnail: '', url: '' },
    selectReason: '',
  };

  const initialVote: IBookVote = {
    id: `${(allVotesLength + 1).toString().padStart(3, '0')}`,
    title: '',
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
    deadline: formatDate(new Date(), 'yyyy-MM-dd'),
    voteItems: [initialVoteItem, { ...initialVoteItem, id: 2 }],
  };

  const [newVote, setNewVote] = useState(initialVote);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('register');

  // const { sendVotePushNotification } = useSendPushNotification();

  const setDocVote = async () => {
    const document = doc(dbService, BOOK_VOTE, `VoteId-${newVote.id}`);
    await setDoc(document, newVote);
  };

  const onNewVoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (newVote.title === '') return;

    const findNoBookInfo = newVote.voteItems.find(
      voteItem => voteItem.book.title === '',
    );
    if (findNoBookInfo) return alert('투표 항목이 모두 작성되지 않았습니다!');

    try {
      setDocVote();
      window.alert('투표가 성공적으로 등록되었습니다!');
      onToggleModal();
      // 모든 유저에게 알림 보내기
      // sendVotePushNotification({
      //   voteTitle: newVote.title,
      //   subPath: `/vote/${newVote.id}`,
      // });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onVoteTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const vote = { ...newVote, title: event.currentTarget.value };
    setNewVote(vote);
  };

  const onDateChange = (date: Date) => {
    const vote = { ...newVote, deadline: formatDate(date, 'yyyy-MM-dd') };
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
    setNewVote(prev => ({ ...prev, ...newVoteItems }));
  };

  const onDeleteVoteItemClick = (voteId: number) => {
    const filteredVoteItems: IBookVoteItem[] = newVote.voteItems.filter(
      ({ id }) => id !== voteId,
    );
    setNewVote(prev => {
      return { ...prev, voteItems: filteredVoteItems };
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
