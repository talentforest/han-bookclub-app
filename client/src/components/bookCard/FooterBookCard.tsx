import { formatDate } from '@/utils';

import { BaseBookData } from '@/types';

import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface FooterBookCardProps {
  book: Partial<BaseBookData>;
  className?: string;
  yearMonthId?: string;
}

export default function FooterBookCard({
  book,
  className,
  yearMonthId,
}: FooterBookCardProps) {
  const { authors, publisher, thumbnail, title } = book;

  return (
    <div className={`flex w-full items-center gap-2 py-1 ${className}`}>
      <BookThumbnail
        thumbnail={thumbnail}
        title={title}
        className={`"ml-0.5 w-7 [&>img]:!shadow-md [&>img]:!shadow-gray2`}
      />

      <div className="flex w-full flex-1 flex-col items-start">
        <h5 className="line-clamp-1 truncate whitespace-pre-wrap text-start font-medium">
          {title}
        </h5>

        {authors && publisher && (
          <div className="flex items-center">
            {yearMonthId && (
              <>
                <span className="min-w-fit text-sm tracking-tight text-blue3">
                  {formatDate(yearMonthId, 'yyyy년 M월')} 모임
                </span>
                <span className="mx-0.5 text-blue3">|</span>
              </>
            )}
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          </div>
        )}
      </div>
    </div>
  );
}
