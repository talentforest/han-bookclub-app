import { IRecommendedBook, ISearchedBook } from 'data/bookAtom';

import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';

interface FooterBookCardProps {
  book: ISearchedBook | IRecommendedBook;
  className?: string;
}

export default function FooterBookCard({
  book,
  className,
}: FooterBookCardProps) {
  const { authors, publisher, thumbnail, title } = book;

  return (
    <div className={`flex w-full items-center gap-3 py-1 ${className}`}>
      <BookThumbnail thumbnail={thumbnail} title={title} />
      <div className="h-full w-full flex-1">
        <h5 className="line-clamp-1 truncate whitespace-pre-wrap text-start">
          {title}
        </h5>
        <BookAuthorPublisher authors={authors} publisher={publisher} />
      </div>
    </div>
  );
}
