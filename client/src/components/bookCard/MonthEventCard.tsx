import { useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { thisMonth } from '@/utils';

import Tag from '@/components/common/Tag';

interface MonthEventCardProps {
  yearMonthId: string;

  className?: string;
}

export default function MonthEventCard({
  yearMonthId,

  className = '',
}: MonthEventCardProps) {
  const monthClubInfo = useRecoilValue(clubByMonthSelector(yearMonthId));

  const month = +yearMonthId.slice(-2);

  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-2 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
      <div
        className={`flex flex-col justify-between rounded-card bg-white px-4 py-5 shadow-card ${className}`}
      >
        {pathname === '/' && (
          <Tag
            text={`${month}월 이벤트`}
            color={+month === +thisMonth ? 'green' : 'purple'}
            shape="rounded"
            className="mb-3 font-medium shadow-2xl"
          />
        )}
        <h1 className="mb-1.5 line-clamp-2 w-full text-lg font-medium leading-6">
          {monthClubInfo.meeting.eventMonth.title}
        </h1>
        <span className="text-gray1">
          이벤트 콘텐츠 {monthClubInfo.meeting.eventMonth.contents.length}개
        </span>
      </div>
    </div>
  );
}
