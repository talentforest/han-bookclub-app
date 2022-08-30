import { authService, dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCollection, IVote, IVoteItem } from "util/getFirebaseDoc";
import useAlertAskJoin from "./useAlertAskJoin";

const useHandleVoting = (vote: IVote, userDataUid: string) => {
  const [voteDisabled, setVoteDisabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [voteItem, setVoteItem] = useState(vote.vote.voteItem);
  const [membersVote, setMembersVote] = useState([]);

  const { alertAskJoin } = useAlertAskJoin();

  const voteRef = doc(dbService, "Vote", `${vote.id}`);

  const addDocVoteItems = async () => {
    await setDoc(
      doc(dbService, `Vote/${vote.id}/Voted Items`, `${userDataUid}`),
      {
        createdAt: Date.now(),
        creatorId: userDataUid,
        voteId: vote.id,
        voteTitle: vote.vote.title,
        voteDeadline: vote.deadline,
        votedItem: selectedItem,
      }
    );
    await updateDoc(voteRef, {
      "vote.voteItem": voteItem,
    });
  };

  useEffect(() => {
    getCollection(`Vote/${vote.id}/Voted Items`, setMembersVote);
  }, [setMembersVote, vote.id]);

  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authService.currentUser.isAnonymous) return alertAskJoin();
    if (selectedItem.length === 0) return;
    try {
      addDocVoteItems();
      window.alert("투표가 완료되었습니다!");
      setVoteDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onVoteItemClick = (index: number, value: string, voteCount: number) => {
    if (authService.currentUser.isAnonymous) {
      alertAskJoin();
    } else {
      setSelectedItem([...selectedItem, { id: index, item: value }]);
      if (selectedItem.some((item) => item.id === index)) {
        setSelectedItem(selectedItem.filter((vote) => vote.id !== index));
      }

      setVoteItem(
        voteItem.map((item) =>
          item.id === index ? { ...item, voteCount: voteCount + 1 } : item
        )
      );
      if (selectedItem.some((item) => item.id === index)) {
        setVoteItem(
          voteItem.map((item) =>
            item.id === index ? { ...item, voteCount: voteCount } : item
          )
        );
      }
    }
  };

  const myVote = membersVote.filter((item) => item.id === userDataUid);
  const totalCount = voteItem
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  const onRevoteClick = () => {
    setMembersVote(membersVote.filter((item) => item.id !== userDataUid));
    setVoteDisabled(false);
    setSelectedItem([]);
    vote.vote.voteItem = voteItem.map((item) =>
      myVote[0].votedItem.some((vote: IVoteItem) => vote.id === item.id)
        ? { ...item, voteCount: item.voteCount - 1 }
        : item
    );
    setVoteItem(
      voteItem.map((item) =>
        myVote[0].votedItem.some((vote: IVoteItem) => vote.id === item.id)
          ? { ...item, voteCount: item.voteCount - 1 }
          : item
      )
    );
  };

  return {
    voteDisabled,
    voteItem,
    totalCount,
    myVote,
    onRevoteClick,
    selectedItem,
    membersVote,
    onVotingSubmit,
    onVoteItemClick,
  };
};

export default useHandleVoting;
