import { BaseBookData } from '@/types';

import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface FooterBookCardProps {
  book: Partial<BaseBookData>;
  className?: string;
}

export default function FooterBookCard({
  book,
  className,
}: FooterBookCardProps) {
  const { authors, publisher, thumbnail, title } = book;

  return (
    <div className={`flex w-full items-center gap-2 py-1 ${className}`}>
      <BookThumbnail thumbnail={thumbnail} title={title} className="ml-1 w-8" />

      <div className="flex w-full flex-1 flex-col items-start">
        <h5 className="line-clamp-1 truncate whitespace-pre-wrap text-start font-medium">
          {title}
        </h5>

        {authors && publisher && (
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        )}
      </div>
    </div>
  );
}
