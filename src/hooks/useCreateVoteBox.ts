import { currentUserState } from "data/userAtom";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pickDay } from "util/constants";

const useCreateVoteBox = (
  setModalOpen: (modalOpen: boolean) => void,
  endDate: Date
) => {
  const userData = useRecoilValue(currentUserState);
  const [vote, setVote] = useState({
    title: "",
    voteItem: [
      { id: 1, item: "", voteCount: 0 },
      { id: 2, item: "", voteCount: 0 },
    ],
  });
  const navigate = useNavigate();

  const moveCreateAccountPage = () => {
    if (authService.currentUser.isAnonymous) {
      const confirm = window.confirm(
        "한페이지 멤버가 되셔야 글 작성이 가능합니다. 아주 간단하게 가입하시겠어요?"
      );
      if (confirm) {
        navigate("/create_account");
        return;
      }
    }
  };

  const addDocVote = async () => {
    await addDoc(collection(dbService, "Vote"), {
      createdAt: Date.now(),
      creatorId: userData.uid,
      deadline: pickDay(endDate),
      vote,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vote.title) return;
    try {
      if (authService.currentUser.isAnonymous) {
        moveCreateAccountPage();
      } else {
        addDocVote();
        window.alert("투표가 성공적으로 등록되었습니다!");
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (
    event: React.FormEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = event.currentTarget;

    if (name === "title") {
      const newVote = { ...vote, title: value };
      setVote(newVote);
    }
    if (name === `vote_item${index}`) {
      const newVote = {
        ...vote,
        voteItem: vote.voteItem.map((item) =>
          item.id === index + 1 ? { ...item, item: value } : item
        ),
      };
      setVote(newVote);
    }
  };

  const onPlusClick = () => {
    if (vote.voteItem.length > 7) return;

    const newVote = {
      ...vote,
      voteItem: [
        ...vote.voteItem,
        { id: vote.voteItem.length + 1, item: "", voteCount: 0 },
      ],
    };
    setVote(newVote);
  };

  const onDeleteClick = (index: number) => {
    const newVote = {
      ...vote,
      voteItem: vote.voteItem.filter((item) => item.id !== index + 1),
    };
    setVote(newVote);
  };

  return {
    vote,
    onSubmit,
    onChange,
    onPlusClick,
    onDeleteClick,
  };
};

export default useCreateVoteBox;
