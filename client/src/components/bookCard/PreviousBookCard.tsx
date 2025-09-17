import { formatDate } from '@/utils';

import { MonthlyBookClub } from '@/types';

import ClubTimePlace from '@/components/common/ClubTimePlace';
import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface PreviousBookCardProps {
  document: MonthlyBookClub;
}

const PreviousBookCard = ({ document }: PreviousBookCardProps) => {
  const {
    id,
    book,
    meeting: { time, place },
  } = document;

  const month = formatDate(id, 'M');

  return (
    <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-between gap-1 rounded-card bg-white px-4 py-5 shadow-card">
      <Tag
        color="lightBlue"
        shape="rounded"
        text={`${month}월의 독서모임`}
        className="font-medium"
      />

      {book ? (
        <>
          <BookThumbnail
            thumbnail={book.thumbnail}
            title={book.title}
            className="mt-4 !h-28 border"
          />

          <h3 className="my-2 text-center text-lg font-medium">{book.title}</h3>
        </>
      ) : (
        <h3 className="my-2 text-center text-lg font-medium">
          {document.meeting.eventMonth.title}
        </h3>
      )}

      <ClubTimePlace
        time={time}
        place={place}
        className="flex flex-col items-center"
      />
    </div>
  );
};

export default PreviousBookCard;
