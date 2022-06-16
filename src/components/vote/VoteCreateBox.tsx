import { Add, CheckCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const VoteCreateBox = () => {
  const [vote, setVote] = useState({
    title: "",
    voteItem: [
      { id: 1, item: "" },
      { id: 2, item: "" },
    ],
  });

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

  return (
    <CreateBox>
      <div>
        <VoteTitle>
          <span>투표 제목: </span>
          <Input
            type="text"
            placeholder="등록하실 투표의 제목을 적어주세요."
            value={vote.title}
            onChange={onChange}
            name="title"
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
              />
            </li>
          ))}
        </VoteList>
        <AddVoteItem>
          <Add />
          투표항목 추가하기
        </AddVoteItem>
      </div>
      <button>투표 등록하기</button>
    </CreateBox>
  );
};

const CreateBox = styled.form`
  position: fixed;
  top: 50px;
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
  }
  > button {
    font-size: 13px;
    font-weight: 700;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  > span {
    margin-left: 3px;
    font-weight: 700;
  }
`;

const VoteList = styled.ul`
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    svg {
      margin-right: 5px;
    }
    input {
      width: 100%;
      height: 30px;
    }
  }
`;

const AddVoteItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-bottom: 30px;
  svg {
    width: 18px;
    height: 148x;
  }
`;

export default VoteCreateBox;
