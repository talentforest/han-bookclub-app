import { authService, dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCollection, IVote, IVoteItem } from "util/getFirebaseDoc";

const useHandleVoting = (
  setVoteDisabled: (voteDisabled: boolean) => void,
  voteDetail: IVote,
  userDataUid: string
) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [voteItems, setVoteItems] = useState(voteDetail?.vote.voteItem);
  const [personalVote, setPersonalVote] = useState([]);
  const anonymous = authService.currentUser?.isAnonymous;

  const voteItemsRef = `Vote/${voteDetail.id}/Voted Items`;
  const personalVoteRef = doc(dbService, voteItemsRef, `${userDataUid}`);
  const personalVoteData = {
    createdAt: Date.now(),
    creatorId: userDataUid,
    voteId: voteDetail?.id,
    voteTitle: voteDetail?.vote.title,
    voteDeadline: voteDetail.deadline,
    votedItem: selectedItems,
  };
  const allVotesRef = doc(dbService, "Vote", `${voteDetail.id}`);
  const updateAllVotesData = {
    "vote.voteItem": voteItems,
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
      window.alert("투표가 완료되었습니다!");
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
  const myVote = personalVote.filter((item) => item.id === userDataUid);
  const othersVote = personalVote.filter((item) => item.id !== userDataUid);

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

  return {
    voteItems,
    totalVoteCount,
    myVote,
    onRevoteClick,
    selectedItems,
    personalVote,
    onVotingSubmit,
    onVoteItemClick,
  };
};

export default useHandleVoting;
