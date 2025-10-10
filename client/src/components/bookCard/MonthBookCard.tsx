import { FiBookmark } from 'react-icons/fi';

import { thisMonth } from '@/utils';

import { BookData } from '@/types';

import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface MonthBookCardProps {
  month: string;
  book: BookData;
  bookFields: string;
  className?: string;
}

export default function MonthBookCard({
  month,
  book,
  bookFields,
  className = '',
}: MonthBookCardProps) {
  const { title, thumbnail, authors, publisher, url } = book;

  return (
    <div
      className={`flex justify-between gap-x-2 rounded-card bg-white px-4 py-5 shadow-card ${className}`}
    >
      <div className="flex flex-col items-start max-sm:w-[70%]">
        <Tag
          text={`${month}월 모임책`}
          color={+month === +thisMonth ? 'lightGreen' : 'purple'}
          shape="rounded"
          className="font-medium shadow-2xl"
        />

        <div className="ml-1">
          <h1 className="mb-0.5 mt-2.5 line-clamp-2 w-full text-lg font-medium leading-6">
            {title}
          </h1>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
          <div className="mt-2 flex flex-1 items-center gap-x-0.5">
            <FiBookmark className="text-[15px] text-purple1" />
            <span className="text-[15px] text-purple1">{bookFields}</span>
          </div>
        </div>
      </div>

      <BookThumbnail
        title={title}
        thumbnail={thumbnail}
        url={url}
        className="max-sm:h-32"
      />
    </div>
  );
}
