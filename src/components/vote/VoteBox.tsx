import {
  ArrowForwardIosOutlined,
  CheckCircleOutline,
  Help,
  MoreHoriz,
} from "@mui/icons-material";
import { IVote } from "util/getFirebaseDoc";
import { dDay } from "util/timestamp";
import { Link } from "react-router-dom";
import device from "theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  voteDetail: IVote;
}

const VoteBox = ({ voteDetail }: PropsType) => {
  return (
    <Vote>
      <VoteLists>
        <h4>
          <Help />
          {voteDetail.vote.title}
        </h4>
        {voteDetail.vote?.voteItem?.slice(0, 3).map((item) => (
          <li key={item.id}>
            <CheckCircleOutline />
            <span>{item.item}</span>
          </li>
        ))}
        {voteDetail.vote.voteItem.length > 3 && <MoreHoriz />}
      </VoteLists>
      <VoteBottom>
        <p>D-Day: {dDay(voteDetail.deadline)}</p>
        <Link to={`/vote/${voteDetail.voteId}`} state={{ voteDetail }}>
          투표하러 가기
          <ArrowForwardIosOutlined />
        </Link>
      </VoteBottom>
    </Vote>
  );
};

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  width: 100%;
  border-radius: 10px;
  padding: 15px 20px 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    height: 260px;
  }
`;

const VoteLists = styled.ul`
  > h4 {
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    padding-bottom: 10px;
    svg {
      float: left;
      margin: 2px 5px 0 0;
      width: 20px;
      height: 20px;
    }
  }
  > li {
    font-size: 14px;
    border: 1px solid ${(props) => props.theme.container.blue};
    border-radius: 5px;
    padding: 4px 10px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.container.lightBlue};
    display: flex;
    align-items: center;
    > svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
  > svg {
    width: 100%;
    margin-top: 10px;
  }
  @media ${device.tablet} {
    > h4 {
      font-size: 16px;
    }
    > li {
      font-size: 16px;
      margin-top: 13px;
      height: 34px;
    }
  }
`;

const VoteBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  > p {
    color: ${(props) => props.theme.text.accent};
  }
  > a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.text.accent};
    svg {
      width: 14px;
      height: 14px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
  @media ${device.tablet} {
    > p {
      font-size: 14px;
    }
    > a {
      font-size: 14px;
    }
  }
`;

export default VoteBox;
