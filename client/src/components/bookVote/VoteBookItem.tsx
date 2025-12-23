import { ReactNode } from 'react';

import { BiSolidBadgeCheck } from 'react-icons/bi';

import { BookVoteItem } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';

interface VoteBookItemProps {
  voteItem: BookVoteItem;
  selected?: boolean;
  children?: ReactNode;
}

export default function VoteBookItem({
  voteItem,
  children,
  selected,
}: VoteBookItemProps) {
  const {
    book: { title, thumbnail },
  } = voteItem;

  return (
    <li
      className={`flex min-h-48 w-full flex-col items-center justify-center gap-y-1.5 overflow-hidden rounded-card bg-white shadow-card ${children ? 'pt-4' : ''}`}
    >
      <div className="relative flex w-full justify-center max-sm:px-3">
        {selected && (
          <BiSolidBadgeCheck className="absolute -top-2 right-4 z-10 size-10 rounded-full bg-white text-blue2" />
        )}
        <BookThumbnail
          thumbnail={thumbnail}
          title={title}
          className="w-24 max-sm:w-[70px]"
        />
      </div>
      <span className="mt-2 line-clamp-2 h-fit w-4/5 text-center leading-5">
        《{title}》
      </span>

      {children}
    </li>
  );
}
