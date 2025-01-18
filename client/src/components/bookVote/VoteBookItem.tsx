import { ReactNode } from 'react';

import { IBookVoteItem } from 'data/voteAtom';

import { BiSolidBadgeCheck } from 'react-icons/bi';

import BookThumbnail from 'components/common/book/BookThumbnail';

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
    <div className="flex h-full min-h-40 w-60 flex-col items-center gap-3 overflow-hidden rounded-xl pt-4 shadow-card sm:w-[47%] sm:gap-2">
      <div className="relative">
        {selected && (
          <BiSolidBadgeCheck className="absolute -right-2 -top-2 size-9 rounded-full bg-white text-[#80df98]" />
        )}
        <BookThumbnail thumbnail={thumbnail} title={title} />
      </div>
      <span className="line-clamp-2 h-12 w-4/5 text-center">《{title}》</span>

      {children}
    </div>
  );
}
