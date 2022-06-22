import { CheckCircleOutline } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dDay } from "util/timestamp";
import { getMyVote, VoteDocument, VoteItem } from "util/getFirebaseDoc";
import { percentage } from "util/percentage";
import styled from "styled-components";
import BackButtonHeader from "components/common/BackButtonHeader";
import { Container } from "theme/commonStyle";

type LocationState = { item: VoteDocument };

const VoteDetail = () => {
  const location = useLocation();
  const { item } = location.state as LocationState;

  const [disabled, setDisabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [voteItem, setVoteItem] = useState(item.vote.voteItem);
  const [membersVote, setMembersVote] = useState([]);

  const userData = useRecoilValue(currentUserState);
  const voteRef = doc(dbService, "Vote", `${item.id}`);

  useEffect(() => {
    getMyVote(item.id, setMembersVote);

    return () => {
      getMyVote(item.id, setMembersVote);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          voteDeadline: item.deadline,
          votedItem: selectedItem,
        }
      );
      await updateDoc(voteRef, {
        "vote.voteItem": voteItem,
      });

      window.alert("투표가 완료되었습니다!");
      setDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onVoteItemClick = (index: number, value: string, voteCount: number) => {
    setSelectedItem([
      ...selectedItem,
      { id: index, item: value, voteCount: voteCount + 1 },
    ]);
    if (selectedItem.some((item) => item.id === index)) {
      setSelectedItem(selectedItem.filter((vote) => vote.id !== index));
    }

    setVoteItem(
      voteItem.map((item) =>
        item.id === index ? { ...item, voteCount: voteCount + 1 } : item
      )
    );
  };

  const myVote = membersVote.filter((item) => item.id === userData.uid);
  const totalCount = voteItem
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  return (
    <>
      <BackButtonHeader title="투표함" />
      <Container>
        <Vote>
          {myVote.length ? (
            <>
              <form>
                <p>D-Day: {dDay(item)}</p>
                <h4>Q. {item.vote.title}</h4>
                <span>투표인원: {membersVote.length}명</span>
                <Votelist className={"disalbe"}>
                  {item.vote.voteItem.map((item, index) => (
                    <li
                      key={item.id}
                      className={
                        myVote[0].votedItem.find(
                          (ele: VoteItem) => ele.id === item.id
                        )
                          ? "isActive"
                          : ""
                      }
                    >
                      <CheckCircleOutline
                        className={
                          myVote[0].votedItem.find(
                            (ele: VoteItem) => ele.id === item.id
                          )
                            ? "isActive"
                            : ""
                        }
                      />
                      <span>{item.item}</span>
                      <Percentage
                        style={{
                          width: `${percentage(
                            voteItem[index].voteCount,
                            totalCount
                          )}%`,
                        }}
                      >
                        {percentage(voteItem[index].voteCount, totalCount)}%
                      </Percentage>
                    </li>
                  ))}
                </Votelist>
              </form>
              <SubmitButton className={"disalbe"}>투표하기</SubmitButton>
            </>
          ) : (
            <form onSubmit={onSubmit}>
              <p>D-Day: {dDay(item)}</p>
              <h4>Q. {item.vote.title}</h4>
              <span>투표인원: {membersVote.length}명</span>
              <Votelist className={disabled ? "disalbe" : ""}>
                {item.vote.voteItem.map((item, index) => (
                  <li
                    key={item.id}
                    onClick={() =>
                      onVoteItemClick(item.id, item.item, item.voteCount)
                    }
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
                    <Percentage
                      style={{
                        width: `${percentage(
                          voteItem[index].voteCount,
                          totalCount
                        )}%`,
                      }}
                    >
                      {percentage(voteItem[index].voteCount, totalCount)}%
                    </Percentage>
                  </li>
                ))}
              </Votelist>
              <SubmitButton type="submit" className={disabled ? "disalbe" : ""}>
                투표하기
              </SubmitButton>
            </form>
          )}
        </Vote>
      </Container>
    </>
  );
};

const Vote = styled.div`
  width: 100%;
  padding: 0 20px;
  > form {
    > h4 {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 10px;
      margin: 15px 0;
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
    position: relative;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    border-radius: 5px;
    padding: 4px 10px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.container.default};
    display: flex;
    align-items: center;
    height: 45px;
    &.isActive {
      border: 2px solid ${(props) => props.theme.container.blue};
    }
    > svg {
      z-index: 1;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      fill: ${(props) => props.theme.text.lightGray};
      &.isActive {
        fill: ${(props) => props.theme.container.blue};
      }
    }
    > span {
      z-index: 1;
      padding-top: 3px;
    }
  }
`;

const Percentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: ${(props) => props.theme.text.white};
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.container.purple};
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
  font-size: 14px;
  height: 40px;
  &.disalbe {
    pointer-events: none;
    background-color: ${(props) => props.theme.text.lightGray};
    color: ${(props) => props.theme.text.gray};
  }
`;

export default VoteDetail;
