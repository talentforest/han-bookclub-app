import { CheckCircleOutline, Delete, Replay } from "@mui/icons-material";
import { EditDeleteIcon } from "components/bookmeeting/Subjects";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { VoteDocument } from "util/getFirebaseDoc";
import { voteTimestamp } from "util/timestamp";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";

type LocationState = { item: VoteDocument };

const VoteDetail = () => {
  const [disabled, setDisabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [voteCount, setVoteCount] = useState({});
  const [voteAgain, setVoteAgain] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state as LocationState;
  const userData = useRecoilValue(currentUserState);
  const voteRef = doc(dbService, "Vote", `${item.id}`);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (selectedItem.length === 0) return;
      await setDoc(
        doc(dbService, `Vote/${item.id}/Voted Items`, `${userData.uid}`),
        {
          createdAt: Date.now(),
          creatorId: userData.uid,
          voteId: item.id,
          voteTitle: item.vote.title,
          voteDeadline: item.vote.deadline,
          votedItem: selectedItem,
        }
      );
      await updateDoc(voteRef, {
        voteCount: [...selectedItem.map((item) => item.voteCount)],
      });

      window.alert("투표가 완료되었습니다!");
      setDisabled(true);
      setVoteAgain(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onVoteItemClick = (index: number, value: string) => {
    setSelectedItem([
      ...selectedItem,
      {
        id: index,
        item: value,
        voteCount: item.vote.voteItem[index - 1].voteCount + 1,
      },
    ]);

    if (selectedItem.some((item) => item.id === index)) {
      setSelectedItem(selectedItem.filter((vote) => vote.id !== index));
    }
  };

  const onVoteAgainClick = () => {
    setVoteAgain(false);
    setDisabled(false);
    setSelectedItem([]);
  };

  const onDeleteClick = async () => {
    await deleteDoc(voteRef);
    window.confirm("정말 투표함을 삭제하시겠습니까?");
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <Subtitle title="투표함" />
        {userData.uid === item.creatorId && (
          <EditDeleteIcon>
            <Delete role="button" onClick={onDeleteClick} />
          </EditDeleteIcon>
        )}
      </Header>
      <Vote>
        {
          <form onSubmit={onSubmit}>
            <p>투표기한: {voteTimestamp(item.vote.deadline)}</p>
            <h4>Q. {item.vote.title}</h4>
            <Votelist className={disabled ? "disalbe" : ""}>
              {item.vote.voteItem.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onVoteItemClick(item.id, item.item)}
                  className={
                    selectedItem.find((ele) => ele.id === item.id)
                      ? "isActive"
                      : ""
                  }
                >
                  <CheckCircleOutline
                    className={
                      selectedItem.find((ele) => ele.id === item.id)
                        ? "isActive"
                        : ""
                    }
                  />
                  <span>{item.item}</span>
                </li>
              ))}
            </Votelist>
            <SubmitButton type="submit" className={disabled ? "disalbe" : ""}>
              투표하기
            </SubmitButton>
            {voteAgain ? (
              <AgainButton onClick={onVoteAgainClick}>
                다시 투표하기
                <Replay />
              </AgainButton>
            ) : null}
          </form>
        }
      </Vote>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 20px;
  h3 {
    margin: 0;
  }
`;

const Vote = styled.div`
  width: 100%;
  padding: 0 20px;
  > form {
    > h4 {
      padding-bottom: 10px;
      margin-bottom: 15px;
      border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    }
    > p {
      width: fit-content;
      font-size: 11px;
      border-radius: 15px;
      padding: 5px 10px 3px;
      margin-bottom: 10px;
      background-color: ${(props) => props.theme.container.yellow};
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

const Votelist = styled.ul`
  position: relative;
  &.disalbe {
    pointer-events: none;
  }
  > li {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    border-radius: 5px;
    padding: 4px 10px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.container.default};
    display: flex;
    align-items: center;
    height: 35px;
    &.isActive {
      border: 2px solid ${(props) => props.theme.container.blue};
    }
    > svg {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      fill: ${(props) => props.theme.text.lightGray};
      &.isActive {
        fill: ${(props) => props.theme.container.blue};
      }
    }
    > span {
      padding-top: 3px;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin: 20px 0 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  border: none;
  padding: 8px;
  color: ${(props) => props.theme.text.accent};
  cursor: pointer;
  border-radius: 5px;
  font-weight: 700;
  font-size: 12px;
  &.disalbe {
    pointer-events: none;
    background-color: ${(props) => props.theme.text.lightGray};
    color: ${(props) => props.theme.text.gray};
  }
`;

const AgainButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  font-weight: 700;
  font-size: 12px;
  padding: 10px 0 6px;
  margin-bottom: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.accent};
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.accent};
  }
`;

export default VoteDetail;
