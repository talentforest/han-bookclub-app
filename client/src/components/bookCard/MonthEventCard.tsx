import { useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { thisMonth } from '@/utils';

import { MonthlyBookClub } from '@/types';

import LabelWithValueCard from '@/components/common/LabelWithValueCard';
import Tag from '@/components/common/Tag';

interface MonthEventCardProps {
  yearMonthId: string;
  event: MonthlyBookClub['meeting'];
  className?: string;
}

export default function MonthEventCard({
  yearMonthId,
  event,
  className = '',
}: MonthEventCardProps) {
  const monthClubInfo = useRecoilValue(clubByMonthSelector(yearMonthId));

  const thisMonthClubInfoList = monthClubInfo && [
    {
      label: '모임장소',
      value: monthClubInfo.meeting?.place,
    },
    {
      label: '모임시간',
      value: monthClubInfo.meeting?.time,
    },
    {
      label: '진행자',
      value: monthClubInfo.meeting.eventMonth?.hosts,
    },
  ];

  const month = +yearMonthId.slice(-2);

  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`flex flex-col justify-between rounded-card bg-white px-6 py-5 shadow-card ${className}`}
      >
        {pathname === '/' && (
          <Tag
            text={`${month}월 이벤트`}
            color={+month === +thisMonth ? 'lightGreen' : 'purple'}
            shape="rounded"
            className="mb-3 font-medium shadow-2xl"
          />
        )}
        <h1 className="mb-1.5 line-clamp-2 w-full text-lg font-medium leading-6">
          {event.eventMonth.title}
        </h1>
        <span className="text-gray1">
          이벤트 콘텐츠 {event.eventMonth.contents.length}개
        </span>
      </div>

      <ul className="col-span-2 mt-4 flex flex-col gap-6 max-sm:gap-4">
        {thisMonthClubInfoList.map(({ label, value }) => (
          <li key={label}>
            <LabelWithValueCard label={label} value={value} editable={false} />
          </li>
        ))}
      </ul>
    </>
  );
}
