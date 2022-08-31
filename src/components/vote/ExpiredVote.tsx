import { ArrowForwardIos, Help } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { IVote } from "util/getFirebaseDoc";
import { timestamp } from "util/timestamp";

interface PropsType {
  voteDetail: IVote;
}

const ExpiredVote = ({ voteDetail }: PropsType) => {
  return (
    <Vote to={`/vote/${voteDetail.voteId}`} state={{ voteDetail }}>
      <div>
        <h4>
          <Help />
          {voteDetail.vote.title}
        </h4>
        <span>{timestamp(voteDetail.deadline)}</span>
      </div>
      <div>
        <span>투표결과 보기</span>
        <ArrowForwardIos />
      </div>
    </Vote>
  );
};

const Vote = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px;
  background-color: ${(props) => props.theme.container.default};
  > div {
    h4 {
      display: flex;
      align-items: center;
      font-weight: 700;
      svg {
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
    &:last-child {
      display: flex;
      align-items: center;
      span {
        margin: 0;
      }
      svg {
        margin-left: 5px;
        width: 16px;
        height: 16px;
        fill: ${(props) => props.theme.text.accent};
      }
    }
  }

  @media ${device.tablet} {
    > div {
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
  }
`;

export default ExpiredVote;
