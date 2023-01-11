import {
  ArrowForwardIosOutlined,
  CheckCircleOutline,
  Help,
  MoreHoriz,
} from '@mui/icons-material';
import { getDDay, cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import { IVote } from 'data/voteItemAtom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface PropsType {
  voteDetail: IVote;
}

const VoteBox = ({ voteDetail }: PropsType) => {
  return (
    <Vote>
      <VoteInfo>
        <h4>
          <Help />
          {cutLetter(voteDetail.vote.title, 30)}
        </h4>
        {voteDetail.vote?.voteItem?.slice(0, 3).map((item) => (
          <li key={item.id}>
            <CheckCircleOutline />
            <span>{cutLetter(item.item, 30)}</span>
          </li>
        ))}
        {voteDetail.vote.voteItem.length > 3 && <MoreHoriz />}
      </VoteInfo>
      <VoteBottom>
        <p>D-Day: {getDDay(voteDetail.deadline)}</p>
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
    min-height: 270px;
  }
`;

const VoteInfo = styled.ul`
  > h4 {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 10px;
    svg {
      float: left;
      margin: 2px 5px 0 0;
      width: 20px;
      height: 20px;
    }
  }
  > li {
    min-height: 40px;
    font-size: 14px;
    border: 1px solid ${(props) => props.theme.container.blue};
    border-radius: 10px;
    padding: 4px 10px;
    margin: 5px 0;
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
      min-height: 40px;
    }
  }
`;

const VoteBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
  margin-top: 10px;
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
