import { votesState } from "data/documentsAtom";
import { currentUserState } from "data/userAtom";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { pickDay } from "util/constants";
import useAlertAskJoin from "./useAlertAskJoin";

interface ICreateVoteBox {
  setModalOpen: (modalOpen: boolean) => void;
  endDate: Date;
}

const useCreateVoteBox = ({ setModalOpen, endDate }: ICreateVoteBox) => {
  const userData = useRecoilValue(currentUserState);
  const votes = useRecoilValue(votesState);
  const { alertAskJoinMember } = useAlertAskJoin();
  const [vote, setVote] = useState({
    title: "",
    voteItem: [
      { id: 1, item: "", voteCount: 0, selectReason: "" },
      { id: 2, item: "", voteCount: 0, selectReason: "" },
    ],
  });

  const addDocVote = async () => {
    await addDoc(collection(dbService, "Vote"), {
      createdAt: Date.now(),
      creatorId: userData.uid,
      deadline: pickDay(endDate),
      vote,
      voteId: votes.length + 1,
    });
  };

  const onRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vote.title) return;
    try {
      if (authService.currentUser.isAnonymous) {
        alertAskJoinMember();
      } else {
        addDocVote();
        window.alert("투표가 성공적으로 등록되었습니다!");
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onTitleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>,
    id?: number
  ) => {
    const { name, value } = event.currentTarget;

    if (name === "title") {
      const newVote = { ...vote, title: value };
      setVote(newVote);
    }
    if (name === `vote_item${id}`) {
      const newVote = {
        ...vote,
        voteItem: vote.voteItem.map((item) =>
          item.id === id ? { ...item, item: value } : item
        ),
      };
      setVote(newVote);
    }
    if (name === `selectReason${id}`) {
      const newVote = {
        ...vote,
        voteItem: vote.voteItem.map((item) =>
          item.id === id ? { ...item, selectReason: value } : item
        ),
      };
      setVote(newVote);
    }
  };

  const onItemPlusClick = () => {
    if (vote.voteItem.length > 5) return;

    const newVote = {
      ...vote,
      voteItem: [
        ...vote.voteItem,
        {
          id: vote.voteItem.length + 1,
          item: "",
          voteCount: 0,
          selectReason: "",
        },
      ],
    };
    setVote(newVote);
  };

  const onItemDeleteClick = (id: number) => {
    const newVote = {
      ...vote,
      voteItem: vote.voteItem.filter((item) => item.id !== id),
    };
    setVote(newVote);
  };

  return {
    vote,
    onRegisterSubmit,
    onTitleChange,
    onItemPlusClick,
    onItemDeleteClick,
  };
};

export default useCreateVoteBox;
