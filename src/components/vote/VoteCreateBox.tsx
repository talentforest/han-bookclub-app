import { Add, CheckCircleOutline, Close } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface PropsType {
  setModalOpen: (modalOpen: boolean) => void;
}

const VoteCreateBox = ({ setModalOpen }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const [vote, setVote] = useState({
    title: "",
    deadline: "",
    voteItem: [
      { id: 1, item: "", voteCount: 0 },
      { id: 2, item: "", voteCount: 0 },
    ],
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!vote.title) return;
      await addDoc(collection(dbService, "Vote"), {
        createdAt: Date.now(),
        creatorId: userData.uid,
        vote,
      });
      window.alert("투표가 성공적으로 등록되었습니다!");
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
    if (name === "deadline") {
      const newVote = { ...vote, deadline: value };
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

  return (
    <CreateBox onSubmit={onSubmit}>
      <div>
        <VoteTitle>
          <span>투표 제목</span>
          <Input
            type="text"
            placeholder="등록하실 투표의 제목을 적어주세요."
            value={vote.title}
            onChange={onChange}
            name="title"
            required
          />
        </VoteTitle>
        <VoteList>
          {vote.voteItem.map((item, index: number) => (
            <li key={index}>
              <CheckCircleOutline />
              <Input
                type="text"
                placeholder="투표항목을 적어주세요."
                name={`vote_item${index}`}
                value={item.item}
                onChange={(event) => onChange(event, index)}
                required
              />
              {index > 1 && <Close onClick={() => onDeleteClick(index)} />}
            </li>
          ))}
          <AddVoteItem onClick={onPlusClick}>
            <Add />
            투표항목 추가하기
          </AddVoteItem>
          {vote.voteItem.length > 7 && (
            <span>투표항목은 8개를 넘을 수 없습니다.</span>
          )}
        </VoteList>
        <Deadline>
          <span>투표 기한</span>
          <input
            id="datepicker"
            type="date"
            name="deadline"
            value={vote.deadline}
            onChange={(event) => onChange(event)}
            required
          />
        </Deadline>
      </div>
      <button type="submit">투표 등록하기</button>
    </CreateBox>
  );
};

const CreateBox = styled.form`
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  padding: 20px 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  > div {
    width: 100%;
    span:last-child {
      font-size: 12px;
      margin-left: 5px;
      color: ${(props) => props.theme.text.gray};
    }
  }
  > button {
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    margin-top: 30px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.blue};
    color: ${(props) => props.theme.text.white};
  }
`;

const Input = styled.input`
  font-size: 14px;
  width: 100%;
  height: 30px;
  padding-left: 3px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.container.yellow};
  }
`;

const VoteTitle = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  > span {
    margin-left: 3px;
    font-weight: 700;
  }
`;

const VoteList = styled.ul`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  li {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    svg {
      margin-right: 5px;
      width: 16px;
      height: 16px;
      &:last-child {
        position: absolute;
        right: 0;
        cursor: pointer;
        width: 14px;
        height: 14px;
      }
    }
    input {
      width: 100%;
      height: 30px;
    }
  }
`;

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.container.default};
  span {
    font-size: 13px;
    margin-bottom: 3px;
  }
  input {
    height: 32px;
  }
`;

const AddVoteItem = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${(props) => props.theme.text.accent};
  svg {
    width: 18px;
    height: 148x;
    fill: ${(props) => props.theme.text.accent};
  }
`;

export default VoteCreateBox;
