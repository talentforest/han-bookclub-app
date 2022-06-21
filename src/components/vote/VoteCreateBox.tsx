import { Add, CheckCircleOutline, Close } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";

interface PropsType {
  setModalOpen: (modalOpen: boolean) => void;
}

const VoteCreateBox = ({ setModalOpen }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const [endDate, setEndDate] = useState(new Date());
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
        <Vote>
          <span>투표 제목</span>
          <Input
            type="text"
            placeholder="등록하실 투표의 제목을 적어주세요."
            value={vote.title}
            onChange={onChange}
            name="title"
            required
          />
          <ul>
            <span>투표 항목</span>
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
          </ul>
          <AddVoteItem onClick={onPlusClick}>
            <Add />
            투표항목 추가하기
          </AddVoteItem>
          {vote.voteItem.length > 7 && (
            <span>투표항목은 8개를 넘을 수 없습니다.</span>
          )}
        </Vote>
        <Deadline>
          <span>투표 종료일</span>
          <DatePick
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={new Date()}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
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
  margin: 30px;
  padding: 20px 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.purple};
  > div {
    width: 100%;
  }
  > button {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    margin-top: 30px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.yellow};
    color: ${(props) => props.theme.text.gray};
  }
`;

const Input = styled.input`
  font-size: 15px;
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

const Vote = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  > span {
    display: block;
    margin-bottom: 6px;
    font-weight: 700;
  }
  > ul {
    margin-top: 20px;
    span {
      display: block;
      font-size: 14px;
      margin-bottom: 6px;
      font-weight: 700;
    }
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
  }
`;

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.container.default};
  span {
    display: block;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

const DatePick = styled(DatePicker)`
  width: 100%;
  height: 32px;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.container.blue};
  }
`;

const AddVoteItem = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 15px;
  color: ${(props) => props.theme.text.accent};
  svg {
    width: 18px;
    height: 148x;
    fill: ${(props) => props.theme.text.accent};
  }
`;

export default VoteCreateBox;
