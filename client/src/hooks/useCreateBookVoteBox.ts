import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, setDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';
import { bookVotesState, initialBookVoteItem } from '@/data/voteAtom';

import { BOOK_VOTE } from '@/appConstants';

import {
  useAlertAskJoin,
  useHandleModal,
  useSendPushNotification,
} from '@/hooks';

import { formatDate } from '@/utils';

import { BookVote, BookVoteItem } from '@/types';

export const useCreateBookVoteBox = () => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const bookVotes = useRecoilValue(bookVotesState);

  const allVotesLength = bookVotes.length;

  const initialVoteItem = {
    id: 1,
    book: { title: '', thumbnail: '', url: '' },
    selectReason: '',
  };

  const initialVote: BookVote = {
    id: `${(allVotesLength + 1).toString().padStart(3, '0')}`,
    title: '',
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
    deadline: formatDate(new Date(), 'yyyy-MM-dd'),
    voteItems: [initialVoteItem, { ...initialVoteItem, id: 2 }],
  };

  const [newVote, setNewVote] = useState(initialVote);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('register');

  const { sendPushNotificationToAllUser, isPending } =
    useSendPushNotification();

  const setDocVote = async () => {
    const document = doc(dbService, BOOK_VOTE, `VoteId-${newVote.id}`);
    await setDoc(document, newVote);
  };

  const { hideModal } = useHandleModal();

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
      hideModal();

      sendPushNotificationToAllUser({
        title: '🗳️새로운 투표함 등록',
        body: `${newVote.title} 투표함이 등록되었습니다. 종료일 전에 투표를 완료해주세요!⚡️`,
        subPath: `/vote/${newVote.id}`,
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
    const vote = { ...newVote, deadline: formatDate(date, 'yyyy-MM-dd') };
    setNewVote(vote);
  };

  const onAddVoteItemBtn = () => {
    const newVoteItems: { voteItems: BookVoteItem[] } = {
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
    const filteredVoteItems: BookVoteItem[] = newVote.voteItems.filter(
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
    isPending,
  };
};
