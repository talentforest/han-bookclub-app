import { LabeledBox } from 'components/atoms/input/BoxLabeledInput';
import { MdOutlineHowToVote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { cutLetter, getVoteCountsById } from 'util/index';
import { IBookVote, IVoteItemsByMember } from 'data/voteAtom';
import { useEffect, useState } from 'react';
import { BOOK_VOTE, VOTEDITEMS_BY_MEMBER, VOTED_ITEMS } from 'constants/index';
import { getCollection } from 'api/getFbDoc';
import styled from 'styled-components';

interface Props {
  vote: IBookVote;
  collName: string;
}

export default function VoteExpiredBox({ vote, collName }: Props) {
  const [votedItemsByMember, setVotedItemsMyMember] = useState<
    IVoteItemsByMember[]
  >([]);

  const { voteId, voteItems, title, id } = vote;

  const subCollName =
    collName === BOOK_VOTE ? VOTEDITEMS_BY_MEMBER : VOTED_ITEMS;

  useEffect(() => {
    if (!votedItemsByMember?.length) {
      getCollection(`${collName}/${id}/${subCollName}`, setVotedItemsMyMember);
    }
  }, []);

  const voteCountsById = getVoteCountsById(voteItems, votedItemsByMember);

  const getHighestVoted = voteCountsById.find((book, _, arr) => {
    return book.voteCount === Math.max(...arr.map((book) => book.voteCount));
  });

  return (
    <VoteDetailLink to={`/vote/${voteId}`} state={{ collName, docId: id }}>
      <Title>
        <MdOutlineHowToVote fill='#666' fontSize={20} />
        {cutLetter(title, 40)}
      </Title>

      <LabelResultBox>
        <div className='label'>
          <span>선정</span>
        </div>

        <div className='info'>
          <span>{getHighestVoted.title}</span>
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
