import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { fieldAndHostSelector } from '@/data/fieldAndHostAtom';

import { thisMonth } from '@/utils';

import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookField from '@/components/common/book/BookField';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface MonthBookCardProps {
  yearMonthId: string;
  className?: string;
}

export default function MonthBookCard({
  yearMonthId,
  className = '',
}: MonthBookCardProps) {
  const monthClubInfo = useRecoilValue(clubByMonthSelector(yearMonthId));

  const fieldAndHost = useRecoilValue(fieldAndHostSelector(yearMonthId));

  const month = +yearMonthId.slice(-2);

  const { title, thumbnail, authors, publisher, url } = monthClubInfo.book;

  return (
    <div
      className={`flex justify-between gap-x-2 rounded-card bg-white px-4 py-5 shadow-card ${className}`}
    >
      <div className="flex flex-1 flex-col items-start">
        <Tag
          text={`${+month}월 모임책`}
          color={+month === +thisMonth ? 'lightBlue' : 'purple'}
          shape="rounded"
          className="font-medium"
        />

        <div className="ml-1">
          <h1 className="mb-0.5 mt-2.5 line-clamp-2 w-full text-lg font-medium leading-[22px]">
            {title}
          </h1>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
          {fieldAndHost?.field && <BookField field={fieldAndHost?.field} />}
        </div>
      </div>

      <BookThumbnail
        title={title}
        thumbnail={thumbnail}
        url={url}
        className="w-[84px]"
      />
    </div>
  );
}
