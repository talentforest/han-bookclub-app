import { CheckCircleOutline, Replay } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dDay } from "util/timestamp";
import { getMembersVote, VoteDocument, VoteItem } from "util/getFirebaseDoc";
import { percentage } from "util/percentage";
import { Container } from "theme/commonStyle";
import styled from "styled-components";
import BackButtonHeader from "components/common/BackButtonHeader";
import UserInfoBox from "components/common/UserInfoBox";

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
    getMembersVote(item.id, setMembersVote);

    return () => {
      getMembersVote(item.id, setMembersVote);
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
  };

  const myVote = membersVote.filter((item) => item.id === userData.uid);
  const totalCount = voteItem
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  const onRevoteClick = () => {
    setMembersVote(membersVote.filter((item) => item.id !== userData.uid));
    setDisabled(false);
    setSelectedItem([]);
    setVoteItem(
      voteItem.map((item) =>
        myVote[0].votedItem.some((vote: VoteItem) => vote.id === item.id)
          ? { ...item, voteCount: item.voteCount - 1 }
          : item
      )
    );
  };

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
                          width: voteItem[index].voteCount
                            ? `${percentage(
                                voteItem[index].voteCount,
                                totalCount
                              )}%`
                            : "",
                        }}
                      >
                        {voteItem[index].voteCount !== 0 ? (
                          `${percentage(
                            voteItem[index].voteCount,
                            totalCount
                          )}%`
                        ) : (
                          <></>
                        )}
                      </Percentage>
                    </li>
                  ))}
                </Votelist>
                <SubmitButton className={"disalbe"}>투표하기</SubmitButton>
                <SubmitButton onClick={onRevoteClick}>
                  다시 투표하기 <Replay />
                </SubmitButton>
              </form>
              <VoteMember>
                <h4>투표인원: {membersVote.length}명</h4>
                <ul>
                  {membersVote.map((member) => (
                    <li key={member.id}>
                      <UserInfoBox creatorId={member.id} key={member.id} />
                    </li>
                  ))}
                </ul>
              </VoteMember>
            </>
          ) : (
            <>
              <form onSubmit={onSubmit}>
                <p>D-Day: {dDay(item)}</p>
                <h4>Q. {item.vote.title}</h4>
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
                          width: voteItem[index].voteCount
                            ? `${percentage(
                                voteItem[index].voteCount,
                                totalCount
                              )}%`
                            : "",
                        }}
                      >
                        {voteItem[index].voteCount !== 0 ? (
                          `${percentage(
                            voteItem[index].voteCount,
                            totalCount
                          )}%`
                        ) : (
                          <></>
                        )}
                      </Percentage>
                    </li>
                  ))}
                </Votelist>
                <SubmitButton
                  type="submit"
                  className={disabled ? "disalbe" : ""}
                >
                  투표하기
                </SubmitButton>
              </form>
              <VoteMember>
                <h4>투표인원: {membersVote.length}명</h4>
                <ul>
                  {membersVote.map((member) => (
                    <li key={member.id}>
                      <UserInfoBox creatorId={member.id} key={member.id} />
                    </li>
                  ))}
                </ul>
              </VoteMember>
            </>
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

const VoteMember = styled.div`
  h4 {
    font-size: 14px;
    width: fit-content;
    margin-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 10px;
  }
`;

const Votelist = styled.ul`
  position: relative;
  margin-bottom: 20px;
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
  color: ${(props) => props.theme.text.gray};
  font-size: 13px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.container.purple};
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 8px;
  background-color: ${(props) => props.theme.container.lightBlue};
  color: ${(props) => props.theme.text.accent};
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  > svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.accent};
  }
  &.disalbe {
    pointer-events: none;
    background-color: ${(props) => props.theme.text.lightGray};
    color: ${(props) => props.theme.text.gray};
  }
`;

export default VoteDetail;
