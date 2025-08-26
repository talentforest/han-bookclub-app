import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import { BaseBookData, BookData } from '@/types';

interface FooterBookCardProps {
  book: BookData | Partial<BaseBookData>;
  className?: string;
}

export default function FooterBookCard({
  book,
  className,
}: FooterBookCardProps) {
  const { authors, publisher, thumbnail, title } = book;

  console.log(authors, publisher);

  return (
    <div className={`flex w-full items-center gap-3 py-1 ${className}`}>
      <BookThumbnail thumbnail={thumbnail} title={title} />

      <div className="flex h-full w-full flex-1 flex-col items-start">
        <h5 className="line-clamp-1 truncate whitespace-pre-wrap text-start">
          {title}
        </h5>

        {authors && publisher && (
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        )}
      </div>
    </div>
  );
}
