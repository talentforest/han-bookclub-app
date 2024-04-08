import { LabeledBox } from 'components/atoms/input/BoxLabeledInput';
import { MdOutlineHowToVote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { cutLetter } from 'util/index';
import { IBookVoteItem } from 'data/voteAtom';
import styled from 'styled-components';

interface Props {
  voteId: number;
  voteTitle: string;
  voteItems: IBookVoteItem[];
}

export default function VoteExpiredBox({
  voteId,
  voteTitle,
  voteItems,
}: Props) {
  const getVoteResultTitle = () => {
    const voteCountArr = voteItems.map(({ voteCount }) => voteCount);
    const maxVoteCount = Math.max(...voteCountArr);

    const voteResult = voteItems.find(
      ({ voteCount }) => voteCount === maxVoteCount
    );

    return voteResult.book.title;
  };

  return (
    <VoteDetailLink to={`/vote/${voteId}`} state={{ voteDocId: voteId }}>
      <Title>
        <MdOutlineHowToVote fill='#666' fontSize={20} />
        {cutLetter(voteTitle, 40)}
      </Title>

      <LabelResultBox>
        <div className='label'>
          <span>선정</span>
        </div>

        <div className='info'>
          <span>{getVoteResultTitle()}</span>
        </div>
      </LabelResultBox>
    </VoteDetailLink>
  );
}

export const VoteDetailLink = styled(Link)`
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
  box-shadow: none;
  div.label {
    padding: 0 5px;
    gap: 4px;
    min-width: 60px;
    width: 60px;
    background-color: ${({ theme }) => theme.text.gray2};
    span {
      color: white;
    }
  }
  div.info {
    background-color: ${({ theme }) => theme.container.default};
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 8px;
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
    span {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 15px;
    }
  }
`;
