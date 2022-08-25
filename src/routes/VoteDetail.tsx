import { CheckCircleOutline, Help, Replay } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dDay } from "util/timestamp";
import { IVote, IVoteItem } from "util/getFirebaseDoc";
import { percentage } from "util/percentage";
import { Container } from "theme/commonStyle";
import { today } from "util/constants";
import UserInfoBox from "components/common/UserInfoBox";
import useHandleVoting from "hooks/useHandleVoting";
import device from "theme/mediaQueries";
import styled from "styled-components";

type LocationState = { vote: IVote };

const VoteDetail = () => {
  const userData = useRecoilValue(currentUserState);

  const location = useLocation();
  const { vote } = location.state as LocationState;

  const {
    disabled,
    voteItem,
    totalCount,
    myVote,
    onRevoteClick,
    selectedItem,
    membersVote,
    onSubmit,
    onVoteItemClick,
  } = useHandleVoting(vote, userData.uid);

  return (
    <Container>
      <Vote className={vote.deadline < today() ? "disalbe" : ""}>
        {myVote.length ? (
          <>
            <form>
              <p>D-Day: {dDay(vote.deadline)}</p>
              <VoteHeader>
                <h4>
                  <Help />
                  {vote.vote.title}
                </h4>
                <span>
                  투표 등록: <UserInfoBox creatorId={vote.creatorId} />
                </span>
              </VoteHeader>
              <Votelist className={"disalbe"}>
                <p>각 퍼센티지는 현재 득표율이며, 중복 투표도 가능합니다.</p>
                {vote.vote.voteItem.map((item, index) => (
                  <li
                    key={item.id}
                    className={
                      myVote[0].votedItem.find(
                        (ele: IVoteItem) => ele.id === item.id
                      )
                        ? "isActive"
                        : ""
                    }
                  >
                    <CheckCircleOutline
                      className={
                        myVote[0].votedItem.find(
                          (ele: IVoteItem) => ele.id === item.id
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
                        `${percentage(voteItem[index].voteCount, totalCount)}%`
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
              <p>D-Day: {dDay(vote.deadline)}</p>
              <VoteHeader>
                <h4>
                  <Help />
                  {vote.vote.title}
                </h4>
                <span>
                  투표 등록: <UserInfoBox creatorId={vote.creatorId} />
                </span>
              </VoteHeader>
              <Votelist className={disabled ? "disalbe" : ""}>
                <p>각 퍼센티지는 현재 득표율입니다.</p>
                {vote.vote.voteItem.map((item, index) => (
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
                        `${percentage(voteItem[index].voteCount, totalCount)}%`
                      ) : (
                        <></>
                      )}
                    </Percentage>
                  </li>
                ))}
              </Votelist>
              <SubmitButton type="submit" className={disabled ? "disalbe" : ""}>
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
  );
};

const Vote = styled.div`
  width: 100%;
  padding: 0 20px;
  > form {
    > p {
      width: fit-content;
      font-size: 12px;
      border-radius: 15px;
      padding: 5px 10px 3px;
      margin-bottom: 10px;
      background-color: ${(props) => props.theme.container.yellow};
      color: ${(props) => props.theme.text.accent};
    }
  }
  &.disalbe {
    pointer-events: none;
    button {
      background-color: ${(props) => props.theme.text.lightGray};
      color: ${(props) => props.theme.text.gray};
      svg {
        fill: ${(props) => props.theme.text.gray};
      }
    }
  }
  @media ${device.tablet} {
    > form {
      > p {
        font-size: 16px;
      }
    }
  }
`;

const VoteHeader = styled.header`
  margin: 15px 0;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > h4 {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  > span {
    display: flex;
    align-items: center;
    font-size: 14px;
    > div {
      margin-left: 5px;
    }
  }
  @media ${device.tablet} {
    > h4 {
      font-size: 22px;
    }
    > span {
      font-size: 16px;
    }
  }
`;

const Votelist = styled.ul`
  position: relative;
  margin-bottom: 20px;
  &.disalbe {
    pointer-events: none;
  }
  p {
    font-size: 14px;
    color: ${(props) => props.theme.text.lightBlue};
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
    }
  }
  @media ${device.tablet} {
    margin-bottom: 30px;
    p {
      font-size: 16px;
    }
    > li {
      margin-top: 15px;
      height: 60px;
      > svg {
        width: 24px;
        height: 24px;
      }
      > span {
        font-size: 18px;
      }
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
  @media ${device.tablet} {
    font-size: 16px;
  }
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
  @media ${device.tablet} {
    font-size: 16px;
    height: 60px;
    padding: 0px;
  }
`;

const VoteMember = styled.div`
  margin-top: 20px;
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
  @media ${device.tablet} {
    width: 100%;
    margin-top: 30px;
    h4 {
      font-size: 18px;
      margin-bottom: 15px;
    }
    ul {
      font-size: 18px;
    }
  }
`;

export default VoteDetail;
