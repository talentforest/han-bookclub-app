import { authService, dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCollection, IVote, IVoteItem } from "util/getFirebaseDoc";
import useAlertAskJoin from "./useAlertAskJoin";

const useHandleVoting = (voteDetail: IVote, userDataUid: string) => {
  const [voteDisabled, setVoteDisabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [voteItems, setVoteItems] = useState(voteDetail?.vote.voteItem);
  const [personalVote, setPersonalVote] = useState([]);
  const { alertAskJoin } = useAlertAskJoin();
  const anonymous = authService.currentUser?.isAnonymous;

  useEffect(() => {
    getCollection(`Vote/${voteDetail.id}/Voted Items`, setPersonalVote);
  }, [setPersonalVote, voteDetail.id]);

  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (anonymous || selectedItems.length === 0) return;
    try {
      await addPersonalVotingDoc();
      updateVotingDoc();
      window.alert("투표가 완료되었습니다!");
      setVoteDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  function addPersonalVotingDoc() {
    return setDoc(
      doc(dbService, `Vote/${voteDetail.id}/Voted Items`, `${userDataUid}`),
      {
        createdAt: Date.now(),
        creatorId: userDataUid,
        voteId: voteDetail?.id,
        voteTitle: voteDetail?.vote.title,
        voteDeadline: voteDetail.deadline,
        votedItem: selectedItems,
      }
    );
  }

  function updateVotingDoc() {
    updateDoc(doc(dbService, "Vote", `${voteDetail.id}`), {
      "vote.voteItem": voteItems,
    });
  }

  const onVoteItemClick = (id: number, value: string, voteCount: number) => {
    if (anonymous) return alertAskJoin();
    selectVoteItem(id, value);
    updateVoteCount(id, voteCount);
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

  const totalVoteCount = voteItems
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  return {
    voteDisabled,
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
