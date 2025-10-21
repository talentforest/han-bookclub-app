import { FiSearch, FiTrash2 } from 'react-icons/fi';

import { BaseBookData } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';

interface CreateVoteBookCardProps {
  voteId: number;
  book: Pick<BaseBookData, 'title' | 'url' | 'thumbnail'>;
  onCreateClick: () => void;
  onDeleteClick: (voteId: number) => void;
}

export default function CreateVoteBookCard({
  voteId,
  book,
  onCreateClick,
  onDeleteClick,
}: CreateVoteBookCardProps) {
  return (
    <div className="relative min-w-fit">
      {book.title === '' ? (
        <button
          type="button"
          className="flex aspect-[0.68/1] w-[70px] items-center justify-center rounded-r-lg border border-gray1 shadow-card"
          onClick={onCreateClick}
        >
          <FiSearch className="size-[28px] text-gray2" />
        </button>
      ) : (
        <BookThumbnail
          thumbnail={book.thumbnail}
          title={book.title}
          className="w-[70px]"
        />
      )}

      {/* 취소 버튼 */}
      {voteId > 2 && (
        <button
          type="button"
          onClick={() => onDeleteClick(voteId)}
          className="absolute -right-1.5 -top-1.5 p-0.5"
        >
          <FiTrash2 className="size-[25px] rounded bg-white p-0.5 text-2xl shadow-card" />
        </button>
      )}
    </div>
  );
}
