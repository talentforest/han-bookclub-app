import { authService, dbService } from 'fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getCollection } from 'api/getFbDoc';
import { IVote, IVoteItem } from 'data/voteItemAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';

const useHandleVoting = (voteDetail: IVote) => {
  const [voteDisabled, setVoteDisabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [voteItems, setVoteItems] = useState(voteDetail?.vote.voteItem);
  const [personalVote, setPersonalVote] = useState([]);
  const userData = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;

  const voteItemsRef = `Vote/${voteDetail.id}/Voted Items`;
  const personalVoteRef = doc(dbService, voteItemsRef, `${userData.uid}`);
  const personalVoteData = {
    createdAt: Date.now(),
    creatorId: userData.uid,
    voteId: voteDetail?.id,
    voteTitle: voteDetail?.vote.title,
    voteDeadline: voteDetail.deadline,
    votedItem: selectedItems,
  };
  const allVotesRef = doc(dbService, 'Vote', `${voteDetail.id}`);
  const updateAllVotesData = {
    'vote.voteItem': voteItems,
  };

  useEffect(() => {
    getCollection(voteItemsRef, setPersonalVote);
  }, [setPersonalVote, voteItemsRef]);

  // 투표하기 기능
  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (anonymous || selectedItems.length === 0) return;
      await setDoc(personalVoteRef, personalVoteData);
      await updateDoc(allVotesRef, updateAllVotesData);
      window.alert('투표가 완료되었습니다!');
      setVoteDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 투표아이템 선택하기
  const onVoteItemClick = (
    itemId: number,
    value: string,
    voteCount: number
  ) => {
    selectVoteItem(itemId, value);
    updateVoteCount(itemId, voteCount);
  };

  function selectVoteItem(id: number, value: string) {
    setSelectedItems([...selectedItems, { id, item: value }]);
    if (selectedItems.find((item) => item.id === id)) {
      setSelectedItems(selectedItems.filter((vote) => vote.id !== id));
    }
  }

  function updateVoteCount(id: number, voteCount: number) {
    setVoteItems(
      voteItems.map((voteItem) =>
        voteItem.id === id ? checkIfSelectItem(voteItem, voteCount) : voteItem
      )
    );
  }

  function checkIfSelectItem(voteItem: IVoteItem, voteCount: number) {
    return selectedItems.find((selectItem) => selectItem.id === voteItem.id)
      ? { ...voteItem, voteCount }
      : { ...voteItem, voteCount: voteCount + 1 };
  }

  // 재투표하기 기능
  const myVote = personalVote.filter((item) => item.id === userData.uid);
  const othersVote = personalVote.filter((item) => item.id !== userData.uid);

  const onRevoteClick = () => {
    setPersonalVote(othersVote);
    setVoteDisabled(false);
    setSelectedItems([]);
    voteDetail.vote.voteItem = allVotesExceptMine();
    setVoteItems(allVotesExceptMine());
  };

  function allVotesExceptMine() {
    return voteItems.map((item) =>
      myVote[0].votedItem.some((vote: IVoteItem) => vote.id === item.id)
        ? { ...item, voteCount: item.voteCount - 1 }
        : item
    );
  }

  // 총 투표수
  const totalVoteCount = voteItems
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  function mySelectingItem(item: IVoteItem) {
    return selectedItems.find((ele) => ele.id === item.id);
  }

  function mySelectedItem(item: IVoteItem) {
    return myVote[0].votedItem.find((ele: IVoteItem) => ele.id === item.id);
  }

  function existVoteCount(itemId: number) {
    return voteItems[itemId - 1].voteCount;
  }

  return {
    voteDisabled,
    voteItems,
    totalVoteCount,
    myVote,
    onRevoteClick,
    mySelectingItem,
    mySelectedItem,
    existVoteCount,
    personalVote,
    onVotingSubmit,
    onVoteItemClick,
  };
};

export default useHandleVoting;
