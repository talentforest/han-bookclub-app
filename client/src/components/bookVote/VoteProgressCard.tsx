import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

import { cutLetter } from '@/utils';

import { BookVote } from '@/types';

import DDay from '@/components/common/DDay';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface VoteProgressCardProps {
  voteDetail: BookVote;
}

const VoteProgressCard = ({ voteDetail }: VoteProgressCardProps) => {
  const { id, title, voteItems, deadline, creatorId } = voteDetail;

  return (
    <div className="relative flex w-full flex-col justify-between rounded-card bg-white p-4 shadow-card">
      <div className="mb-2 flex w-full items-center justify-between gap-4">
        <h4 className="line-clamp-1 w-4/5 flex-1 gap-1 truncate font-medium">
          <MdOutlineHowToVote className="mb-1 inline size-5 pr-0.5 text-base" />
          {cutLetter(title, 40)}
        </h4>

        <UserImgName userId={creatorId} />
      </div>

      <ul className="my-3 flex items-center justify-center gap-x-5">
        {voteItems.map(({ book: { title, thumbnail }, id }) => (
          <li key={id} className="relative">
            <BookThumbnail
              title={title}
              thumbnail={thumbnail}
              className="w-16"
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-2">
        <DDay hyphenDate={deadline} isDateMark={false} />
        <Link
          to={`/vote/${id}`}
          className="flex items-center justify-end gap-0.5 py-0.5"
        >
          <span className="text-sm font-semibold text-gray1">
            투표하러 가기
          </span>
          <FiChevronRight className="text-sm text-gray1" />
        </Link>
      </div>
    </div>
  );
};

export default VoteProgressCard;
