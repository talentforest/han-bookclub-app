import { formatDate } from '@/utils';

import { MonthlyBookClub } from '@/types';

import ClubTimePlace from '@/components/common/ClubTimePlace';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';

interface ClubCardProps {
  club: MonthlyBookClub;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <div
      className={`relative flex w-full justify-between rounded-card bg-white px-5 py-4 shadow-card`}
    >
      <div className="mr-4 flex w-full flex-col justify-between">
        <h1 className="line-clamp-1 font-semibold tracking-tighter text-blue2">
          {formatDate(club.docId, 'yyyy년 M월')} |{' '}
          <span className="font-medium text-purple2">{club.book.title}</span>
        </h1>

        {club.meeting && (
          <ClubTimePlace
            time={club.meeting.time}
            place={club.meeting.place}
            className="flex flex-col gap-y-0.5"
          />
        )}
      </div>

      <BookThumbnail
        title={club.book.title}
        thumbnail={club.book.thumbnail}
        className="w-[80px]"
      />

      <ChevronRightLinkBtn
        to={`/bookclub/${club.docId}`}
        className="absolute right-4 top-[35%] flex size-12 items-center justify-center rounded-full border bg-blue1 opacity-20 group-hover:opacity-100"
      />
    </div>
  );
}
