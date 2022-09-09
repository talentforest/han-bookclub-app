import { CheckCircleOutline, Replay } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IVote, IVoteItem } from "util/getFirebaseDoc";
import { Container } from "theme/commonStyle";
import { today } from "util/constants";
import UserInfoBox from "components/common/UserInfoBox";
import useHandleVoting from "hooks/useHandleVoting";
import device from "theme/mediaQueries";
import styled from "styled-components";
import FormDetails from "components/voteDetail/FormDetails";
import Percentage from "components/voteDetail/Percentage";

type LocationState = { state: { voteDetail: IVote } };

const VoteDetail = () => {
  const userData = useRecoilValue(currentUserState);

  const {
    state: { voteDetail },
  } = useLocation() as LocationState;

  const {
    voteDisabled,
    voteItems,
    totalVoteCount,
    myVote,
    onRevoteClick,
    selectedItems,
    personalVote,
    onVotingSubmit,
    onVoteItemClick,
  } = useHandleVoting(voteDetail, userData.uid);

  function mySelectingItem(item: IVoteItem) {
    return selectedItems.find((ele) => ele.id === item.id);
  }

  function mySelectedItem(item: IVoteItem) {
    return myVote[0].votedItem.find((ele: IVoteItem) => ele.id === item.id);
  }

  function existVoteCount(itemId: number) {
    return voteItems[itemId - 1].voteCount;
  }

  return (
    <Container>
      <Vote className={voteDetail.deadline < today() ? "expired" : ""}>
        {!myVote.length ? (
          <form onSubmit={onVotingSubmit}>
            <FormDetails voteDetail={voteDetail} />
            <Votelist className={voteDisabled ? "disabled" : ""}>
              {voteDetail.vote.voteItem.map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    onVoteItemClick(item.id, item.item, item.voteCount)
                  }
                  className={mySelectingItem(item) ? "isActive" : ""}
                >
                  <CheckCircleOutline
                    className={mySelectingItem(item) ? "isActive" : ""}
                  />
                  <span
                    className={existVoteCount(item.id) ? "shrinkWidth" : ""}
                  >
                    {item.item}
                  </span>
                  <Percentage
                    voteItems={voteItems}
                    item={item}
                    totalVoteCount={totalVoteCount}
                  />
                </li>
              ))}
            </Votelist>
            <SubmitButton
              type="submit"
              className={voteDisabled ? "disabled" : ""}
            >
              투표하기
            </SubmitButton>
          </form>
        ) : (
          <form>
            <FormDetails voteDetail={voteDetail} />
            <Votelist className={"disabled"}>
              {voteDetail.vote.voteItem.map((item) => (
                <li
                  key={item.id}
                  className={mySelectedItem(item) ? "isActive" : ""}
                >
                  <CheckCircleOutline />
                  <span
                    className={existVoteCount(item.id) ? "shrinkWidth" : ""}
                  >
                    {item.item}
                  </span>
                  <Percentage
                    voteItems={voteItems}
                    item={item}
                    totalVoteCount={totalVoteCount}
                  />
                </li>
              ))}
            </Votelist>
            <SubmitButton className={"disabled"}>투표하기</SubmitButton>
            <SubmitButton onClick={onRevoteClick}>
              다시 투표하기 <Replay />
            </SubmitButton>
          </form>
        )}
        <VoteMember>
          <h4>투표인원: {personalVote.length}명</h4>
          <ul>
            {personalVote.map((member) => (
              <li key={member.id}>
                <UserInfoBox creatorId={member.id} key={member.id} />
              </li>
            ))}
          </ul>
        </VoteMember>
      </Vote>
    </Container>
  );
};

const Vote = styled.div`
  width: 100%;
  padding: 0 20px;
  &.expired {
    pointer-events: none;
    > form {
      > details {
        pointer-events: all;
      }
    }
    button {
      background-color: ${(props) => props.theme.text.lightGray};
      color: ${(props) => props.theme.text.gray};
      svg {
        fill: ${(props) => props.theme.text.gray};
      }
    }
  }
  > form {
    > span {
      width: fit-content;
      font-size: 12px;
      border-radius: 15px;
      padding: 5px 10px 3px;
      background-color: ${(props) => props.theme.container.yellow};
      color: ${(props) => props.theme.text.accent};
    }
    > p {
      font-size: 14px;
      color: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

const Votelist = styled.ul`
  position: relative;
  margin-bottom: 10px;
  &.disabled {
    pointer-events: none;
  }
  > li {
    white-space: pre-line;
    word-break: break-all;
    z-index: 0;
    position: relative;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    border-radius: 5px;
    padding: 4px 10px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.container.default};
    display: flex;
    align-items: center;
    &.isActive {
      border: 2px solid ${(props) => props.theme.container.blue};
      svg {
        fill: ${(props) => props.theme.container.blue};
      }
    }
    > svg {
      z-index: 1;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      fill: ${(props) => props.theme.text.lightGray};
    }
    > span {
      z-index: 1;
      &.shrinkWidth {
        width: 77%;
      }
    }
  }
  @media ${device.tablet} {
    margin-bottom: 30px;
    p {
      font-size: 16px;
    }
    > li {
      padding: 10px 15px;
      margin-top: 15px;
      min-height: 50px;
      > svg {
        width: 24px;
        height: 24px;
      }
      > span {
        font-size: 18px;
        &.shrinkWidth {
          width: 85%;
        }
      }
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 36px;
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
  &.disabled {
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
