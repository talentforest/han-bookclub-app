import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';
import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import { ISearchedBook } from '@/data/bookAtom';
import { thisMonth } from '@/utils';

interface MonthBookCardProps {
  month: string;
  book: ISearchedBook;
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
      className={`flex flex-col justify-between rounded-card bg-white px-6 py-5 shadow-card max-sm:gap-2 max-sm:p-4 ${className}`}
    >
      <div className="flex flex-1 justify-between gap-x-4">
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
          <span className="my-1 flex-1 text-[15px] text-gray2">
            {bookFields}분야
          </span>
        </div>

        <BookThumbnail
          title={title}
          thumbnail={thumbnail}
          className="max-sm:h-36"
        />
      </div>

      <ExternalLinkBtn title="Daum 책 상세정보" url={url} />
    </div>
  );
}
