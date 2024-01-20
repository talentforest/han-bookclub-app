import { Link } from 'react-router-dom';
import { cutLetter } from 'util/index';
import { IVote } from 'data/voteItemAtom';
import { LabeledBox } from 'components/atoms/inputs/BoxLabeledInput';
import { MdOutlineHowToVote } from 'react-icons/md';
import styled from 'styled-components';

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
    const voteResult = voteItem
      .filter((item) => item.voteCount === maxVoteCount)
      .map((item) => item.item);
    return voteResult.join(', ');
  };

  return (
    <Vote to={`/vote/${voteId}`} state={{ voteDocId: id }}>
      <Title>
        <MdOutlineHowToVote fill='#666' fontSize={20} />
        {cutLetter(title, 40)}
      </Title>

      <LabelResultBox>
        <div className='label'>
          <span>선정</span>
        </div>
        <div className='info'>
          <span>{cutLetter(getVoteResultTitle(), 16)}</span>
        </div>
      </LabelResultBox>
    </Vote>
  );
};

const Vote = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 10px;
  background-color: ${({ theme }) => theme.container.gray};
`;

const Title = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text.default};
  svg {
    float: left;
    margin-right: 4px;
    padding-top: 4px;
  }
`;

const LabelResultBox = styled(LabeledBox)`
  margin-bottom: 0;
  div.label {
    padding: 0 5px;
    gap: 4px;
    width: 60px;
    border: 1px solid ${({ theme }) => theme.container.blue1};
    background-color: ${({ theme }) => theme.text.gray2};
    span {
      color: white;
    }
  }
  div.info {
    border: 1px solid ${({ theme }) => theme.text.gray1};
    background-color: ${({ theme }) => theme.container.default};
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
    span {
      font-size: 15px;
    }
  }
`;

export default ExpiredVoteBox;
