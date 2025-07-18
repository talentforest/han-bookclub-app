import { ReactNode } from 'react';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import { IBookVoteItem } from '@/data/voteAtom';
import { BiSolidBadgeCheck } from 'react-icons/bi';

interface Props {
  voteItem: IBookVoteItem;
  selected?: boolean;
  children?: ReactNode;
}

export default function VoteBookItem({ voteItem, children, selected }: Props) {
  const {
    book: { title, thumbnail },
  } = voteItem;

  return (
    <div
      className={`flex h-full min-h-40 w-60 flex-col items-center gap-3 overflow-hidden rounded-card bg-white shadow-card max-sm:w-[45%] max-sm:gap-2 ${children ? 'pt-4' : 'py-5'}`}
    >
      <div className="relative flex w-full justify-center max-sm:px-3">
        {selected && (
          <BiSolidBadgeCheck className="absolute -top-2 right-0 size-9 rounded-full bg-white text-green2" />
        )}
        <BookThumbnail thumbnail={thumbnail} title={title} />
      </div>
      <span className="line-clamp-2 h-10 w-4/5 text-center leading-5">
        《{title}》
      </span>

      {children}
    </div>
  );
}
