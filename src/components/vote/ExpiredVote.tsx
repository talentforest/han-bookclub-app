import { ArrowForwardIos, Help } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { cutLetter } from "util/cutLetter";
import { IVote } from "util/getFirebaseDoc";
import { timestamp } from "util/timestamp";

interface PropsType {
  voteDetail: IVote;
}

const ExpiredVote = ({ voteDetail }: PropsType) => {
  return (
    <Vote to={`/vote/${voteDetail.voteId}`} state={{ voteDetail }}>
      <Info>
        <h4>
          <Help />
          {cutLetter(voteDetail.vote.title, 30)}
        </h4>
        <span>{timestamp(voteDetail.deadline)}</span>
      </Info>
      <ShowButton>
        <span>보기</span>
        <ArrowForwardIos />
      </ShowButton>
    </Vote>
  );
};

const Vote = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px;
  background-color: ${(props) => props.theme.container.default};
`;

const Info = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    font-weight: 700;
    svg {
      float: left;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  > span {
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }
  @media ${device.tablet} {
    h4 {
      font-size: 16px;
      svg {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }
    }
    span {
      font-size: 16px;
    }
  }
  > svg {
    width: 18px;
    height: 18px;
  }
`;

const ShowButton = styled.div`
  width: 18%;
  display: flex;
  align-items: center;
  svg {
    margin: 2px 0 0 3px;
    width: 16px;
    height: 16px;
  }
  @media ${device.tablet} {
    > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default ExpiredVote;
