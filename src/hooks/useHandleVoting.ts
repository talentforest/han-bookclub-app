import { authService, dbService } from 'fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getCollection, getDocument } from 'api/getFbDoc';
import { IVote } from 'data/voteAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { BOOK_VOTE } from 'constants/index';

const useHandleVoting = (voteDocId: string) => {
  const { uid } = useRecoilValue(currentUserState);
  const [currentVote, setCurrentVote] = useState({} as IVote);
  const [selectedVoteItems, setSelectedVoteItems] = useState([]);
  const [votingMember, setVotingMember] = useState([]);

  const memberVoteRef = `Vote/${voteDocId}/Voted Items`;
  const personalVoteRef = doc(dbService, memberVoteRef, `${uid}`);
  const currentVoteRef = doc(dbService, 'Vote', `${voteDocId}`);
  const anonymous = authService.currentUser?.isAnonymous;

  useEffect(() => {
    getCollection(`Vote/${voteDocId}/Voted Items`, setVotingMember);
    getDocument(BOOK_VOTE, `${voteDocId}`, setCurrentVote);
  }, [setVotingMember, voteDocId, setCurrentVote, memberVoteRef]);

  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (anonymous) return alert('한페이지 멤버만 투표가 가능합니다.');
      await setDoc(personalVoteRef, {
        createdAt: Date.now(),
        votedItem: selectedVoteItems,
      });
      await updateDoc(currentVoteRef, {
        'vote.voteItem': currentVote.vote.voteItem,
      });
      window.alert('투표가 완료되었습니다!');
    } catch (error) {
      console.error(error);
    }
  };

  const selectedItem = (id: number) =>
    selectedVoteItems.find((voteItem) => voteItem.id === id);

  const onVoteItemClick = (id: number) => {
    // 클릭 해제
    if (selectedItem(id)) {
      setSelectedVoteItems(
        selectedVoteItems.filter((voteItem) => voteItem.id !== id)
      );
      handleVoteCount(id, 'minus');
    } else {
      setSelectedVoteItems([...selectedVoteItems, { id }]);
      handleVoteCount(id, 'plus');
    }
  };

  const handleVoteCount = (id: number, operator: string) => {
    const voteItems = currentVote.vote.voteItem;
    const newVoteCount = voteItems.map((voteItem) =>
      voteItem.id === id
        ? {
            ...voteItem,
            voteCount:
              operator === 'plus'
                ? voteItem.voteCount + 1
                : voteItem.voteCount - 1,
          }
        : voteItem
    );
    setCurrentVote({
      ...currentVote,
      vote: {
        ...currentVote.vote,
        voteItem: newVoteCount,
      },
    });
  };

  const mySubmittedVote = votingMember.filter((member) => member.id === uid);
  const mySubmittedVoteItems = (id: number) =>
    mySubmittedVote[0]?.votedItem?.find(
      (voteItem: { id: number }) => voteItem.id === id
    );

  return {
    currentVote,
    votingMember,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    mySubmittedVote,
    mySubmittedVoteItems,
  };
};

export default useHandleVoting;
