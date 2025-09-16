import { FiBookmark } from 'react-icons/fi';

import { thisMonth } from '@/utils';

import { BookData } from '@/types';

import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';
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
      className={`flex justify-between gap-x-2 rounded-card bg-white px-6 py-5 shadow-card ${className}`}
    >
      <div className="flex flex-col items-start justify-between max-sm:w-[70%]">
        <Tag
          text={`${month}월 모임책`}
          color={+month === +thisMonth ? 'lightGreen' : 'purple'}
          shape="rounded"
          className="font-medium shadow-2xl"
        />
        <h1 className="mb-0.5 mt-2.5 line-clamp-2 w-full text-lg font-medium leading-6">
          {title}
        </h1>
        <BookAuthorPublisher authors={authors} publisher={publisher} />
        <div className="mb-2 mt-1 flex flex-1 items-center gap-x-0.5">
          <FiBookmark className="text-[15px] text-gray1" />
          <span className="text-[15px] text-gray1">{bookFields}분야</span>
        </div>
        <ExternalLinkBtn title="Daum 책 상세정보" url={url} />
      </div>

      <BookThumbnail
        title={title}
        thumbnail={thumbnail}
        className="max-sm:h-36"
      />
    </div>
  );
}
