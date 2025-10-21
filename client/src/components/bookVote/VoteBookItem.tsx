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
    <div
      className={`flex h-full w-40 flex-col items-center gap-3 overflow-hidden rounded-card bg-white shadow-card max-sm:w-[45%] max-sm:gap-2 ${children ? 'pt-4' : 'py-5'}`}
    >
      <div className="relative flex w-full justify-center max-sm:px-3">
        {selected && (
          <BiSolidBadgeCheck className="absolute -top-2 right-0 size-12 rounded-full bg-white text-pointCoral" />
        )}
        <BookThumbnail
          thumbnail={thumbnail}
          title={title}
          className="w-[80%]"
        />
      </div>
      <span className="mt-2 line-clamp-2 h-10 w-4/5 text-center leading-5">
        《{title}》
      </span>

      {children}
    </div>
  );
}
