import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import { Book, IRecommendedBook } from '@/data/bookAtom';

interface FooterBookCardProps {
  book: Book | Partial<IRecommendedBook>;
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
