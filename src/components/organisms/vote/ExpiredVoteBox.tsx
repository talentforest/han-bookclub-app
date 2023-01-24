import { ArrowForwardIos, Help, Verified } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { cutLetter } from 'util/index';
import { IVote } from 'data/voteItemAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  voteDetail: IVote;
}

const ExpiredVoteBox = ({ voteDetail }: PropsType) => {
  const {
    id,
    voteId,
    vote: { title, voteItem },
  } = voteDetail;

  const getVoteResultTitle = () => {
    const voteCountArr = voteItem.map((item) => item.voteCount);
    const maxVoteCount = Math.max(...voteCountArr);
    const voteResult = voteItem.find((item) => item.voteCount === maxVoteCount);
    return voteResult.item;
  };

  return (
    <Vote to={`/vote/${voteId}`} state={{ voteDocId: id }}>
      <Info>
        <Title>
          <Help />
          {cutLetter(title, 30)}
        </Title>
        <Result>
          <Verified /> {getVoteResultTitle()}
        </Result>
      </Info>
      <Btn>
        <ArrowForwardIos />
      </Btn>
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
`;
const Title = styled.h4`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 3px;
  svg {
    float: left;
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.text.lightBlue};
  }
  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;
const Result = styled.span`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  svg {
    float: left;
    width: 20px;
    height: 20px;
    fill: gold;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const Btn = styled.div`
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    > svg {
      width: 20px;
      height: 25px;
    }
  }
`;

export default ExpiredVoteBox;
