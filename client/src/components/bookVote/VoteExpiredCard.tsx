import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

import { cutLetter } from '@/utils';

import { BookVote } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface VoteExpiredCardProps {
  vote: BookVote;
}

export default function VoteExpiredCard({ vote }: VoteExpiredCardProps) {
  const { voteItems, title, id, createdAt, creatorId } = vote;

  return (
    <div className="group relative flex w-full flex-col justify-between rounded-card bg-white bg-opacity-65 p-4 opacity-70 shadow-card">
      <div className="mb-2 flex w-full items-center justify-between gap-4">
        <h4 className="line-clamp-1 w-4/5 flex-1 gap-1 truncate font-medium text-gray1">
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

      <Link
        to={`/vote/${id}`}
        aria-label="상세보기"
        className="absolute right-4 top-[40%] flex size-12 items-center justify-center rounded-full border bg-blue1 opacity-20 group-hover:opacity-100"
      >
        <FiChevronRight className="text-xl text-white" />
      </Link>

      <span className="mt-3 text-end text-sm text-gray1">
        {new Date(createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}
