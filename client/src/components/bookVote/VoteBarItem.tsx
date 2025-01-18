import { IBookVoteItem, IVoteCountById } from 'data/voteAtom';

import { FiCheckCircle } from 'react-icons/fi';
import { getPercentage } from 'utils';

interface Props {
  selected: boolean;
  voteCountsById: IVoteCountById[];
  voteItem: IBookVoteItem;
  totalVoteCount: number;
}

export default function VoteBarItem({
  selected,
  voteCountsById,
  totalVoteCount,
  voteItem,
}: Props) {
  const {
    id: voteItemId,
    book: { title },
  } = voteItem;

  const currentVoteItem = voteCountsById.find(({ id }) => id === voteItemId);

  const gauge = `${getPercentage(currentVoteItem.voteCount, totalVoteCount)}%`;

  return (
    <li key={voteItemId} className={`${selected ? '' : ''}`}>
      <FiCheckCircle fontSize={14} />
      <span>{title}</span>
      <div className={`${gauge}`}>{gauge}</div>
    </li>
  );
}
