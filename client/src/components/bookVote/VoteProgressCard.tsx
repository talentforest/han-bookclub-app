import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

import { BOOK_VOTE } from '@/appConstants';

import { BookVote } from '@/types';

import DDay from '@/components/common/DDay';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface VoteProgressCardProps {
  voteDetail: BookVote;
}

const VoteProgressCard = ({ voteDetail }: VoteProgressCardProps) => {
  const { id, title, voteItems, deadline } = voteDetail;

  return (
    <div className="flex w-fit flex-col justify-between rounded-card bg-white px-7 py-5 shadow-card max-sm:w-full">
      <h4 className="mb-3 flex items-center gap-1 font-medium">
        <MdOutlineHowToVote className="text-base" />
        {title}
      </h4>

      <ul className="flex gap-6">
        {voteItems.map(({ id, book }) => (
          <li key={id} className="h-24">
            <BookThumbnail thumbnail={book.thumbnail} title={book.title} />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-2">
        <DDay hyphenDate={deadline} isDateMark={false} />
        <Link
          to={`/vote/${id}`}
          state={{ collName: BOOK_VOTE, docId: id }}
          className="flex items-center justify-end gap-0.5 py-0.5"
        >
          <span className="text-sm text-gray1">투표하러 가기</span>
          <FiChevronRight className="text-sm text-gray1" />
        </Link>
      </div>
    </div>
  );
};

export default VoteProgressCard;
