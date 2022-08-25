import { authService, dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getMembersVote, IVote, IVoteItem } from "util/getFirebaseDoc";
import useAlertAskJoin from "./useAlertAskJoin";

const useHandleVoting = (vote: IVote, userDataUid: string) => {
  const [disabled, setDisabled] = useState(false);
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
    getMembersVote(vote.id, setMembersVote);

    return () => {
      getMembersVote(vote.id, setMembersVote);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authService.currentUser.isAnonymous) return alertAskJoin();
    if (selectedItem.length === 0) return;
    try {
      addDocVoteItems();
      window.alert("투표가 완료되었습니다!");
      setDisabled(true);
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
    setDisabled(false);
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
    disabled,
    voteItem,
    totalCount,
    myVote,
    onRevoteClick,
    selectedItem,
    membersVote,
    onSubmit,
    onVoteItemClick,
  };
};

export default useHandleVoting;
