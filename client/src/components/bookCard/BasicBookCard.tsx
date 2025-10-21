import { MonthlyBookClub } from '@/types';

import MonthEventCard from '@/components/bookCard/MonthEventCard';
import ClubTimePlace from '@/components/common/ClubTimePlace';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface BasicBookCardProps {
  bookClub: MonthlyBookClub;
  className?: string;
}

export default function BasicBookCard({
  bookClub,
  className = '',
}: BasicBookCardProps) {
  const {
    meeting: { place, time },
    book,
    id,
  } = bookClub;

  return book ? (
    <div
      className={`flex gap-x-4 rounded-card bg-white p-5 shadow-card ${className}`}
    >
      <BookThumbnail
        thumbnail={book.thumbnail}
        title={book.title}
        url={book.url}
        className="w-28"
      />

      <div className="flex w-full flex-col justify-between">
        <h1 className="line-clamp-2 pr-1 text-lg font-medium leading-5">
          {book.title}
        </h1>

        {book.authors && (
          <BookAuthorPublisher
            authors={book.authors}
            publisher={book.publisher}
          />
        )}

        <ClubTimePlace time={time} place={place} className="mt-3.5" />
      </div>
    </div>
  ) : (
    <MonthEventCard yearMonthId={id} event={bookClub.meeting} />
  );
}
