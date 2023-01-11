import { ArrowForwardIos, Help } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { cutLetter, getLocalDate } from 'util/index';
import { IVote } from 'data/voteItemAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  voteDetail: IVote;
}

const ExpiredVote = ({ voteDetail }: PropsType) => {
  const {
    voteId,
    vote: { title },
    deadline,
  } = voteDetail;

  return (
    <Vote to={`/vote/${voteId}`} state={{ voteDetail }}>
      <Info>
        <h4>
          <Help />
          {cutLetter(title, 30)}
        </h4>
        <span>{getLocalDate(deadline)}</span>
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
  padding: 15px 10px;
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
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 50px;
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
