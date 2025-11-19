import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { dbService } from '@/fbase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';
import { initialBookVote } from '@/data/voteAtom';

import { getCollection, getDocument } from '@/api';

import { BOOK_VOTE, VOTED_ITEMS } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { formatDate, getVoteCountsById } from '@/utils';

import { BookVote, BookVoteItemsByMember } from '@/types';

interface UseHandleVotingProps {
  docId: string;
}

export const useHandleVoting = ({ docId }: UseHandleVotingProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const [currentVote, setCurrentVote] = useState<BookVote>(initialBookVote);
  const [selectedVoteItems, setSelectedVoteItems] = useState([]);
  const [votedItemsByMember, setVotedItemsByMember] = useState([]);
  const [isRevote, setIsRevoting] = useState(false);

  const onToggleRevoteClick = () => setIsRevoting(prev => !prev);

  const navigate = useNavigate();

  const { anonymous, alertAskJoinMember } = useAlertAskJoin('see');

  useEffect(() => {
    if (docId && currentVote.id === '') {
      getDocument(BOOK_VOTE, `VoteId-${docId}`, setCurrentVote);
    }
    if (currentVote.id) {
      getCollection(
        `${BOOK_VOTE}/VoteId-${currentVote.id}/${VOTED_ITEMS}`,
        setVotedItemsByMember,
      );
    }
  }, [docId, currentVote.id, setVotedItemsByMember]);

  const onVoteDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');

    if (confirm) {
      const currentVoteRef = doc(dbService, BOOK_VOTE, `VoteId-${docId}`);
      await deleteDoc(currentVoteRef);
      navigate(-1);
    }
  };

  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (selectedVoteItems.length === 0)
      return window.alert('투표할 항목이 선택되지 않았습니다.');

    try {
      const personalVoteRef = doc(
        dbService,
        `${BOOK_VOTE}/VoteId-${currentVote.id}/${VOTED_ITEMS}`,
        uid,
      );

      await setDoc(personalVoteRef, {
        createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        votedItem: selectedVoteItems,
      });

      window.alert('투표가 완료되었습니다!');

      if (myVotedItems) {
        onToggleRevoteClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 내가 선택한 항목
  const selectedItem = (voteId: number) => {
    return selectedVoteItems.find(({ id }) => id === voteId);
  };

  // 투표 항목 선택 / 해제
  const onVoteItemClick = (voteId: number) => {
    const isSelected = selectedItem(voteId);

    if (isSelected) {
      setSelectedVoteItems(selectedVoteItems.filter(({ id }) => id !== voteId));
    } else {
      setSelectedVoteItems([...selectedVoteItems, { id: voteId }]);
    }
  };

  // 내가 투표완료한 항목
  const myVotedItems: BookVoteItemsByMember | undefined =
    votedItemsByMember?.find(({ id }) => id === uid);

  // 항목별 투표수
  const voteCountsById = getVoteCountsById(
    currentVote.voteItems,
    votedItemsByMember,
  );

  // 총 투표수
  const totalVoteCount = voteCountsById
    ?.map(item => item.voteCount)
    ?.reduce((acc, curr) => acc + curr, 0);

  return {
    currentVote,
    votedItemsByMember,
    voteCountsById,
    totalVoteCount,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    myVotedItems,
    onVoteDeleteClick,
    isRevote,
    onToggleRevoteClick,
  };
};
