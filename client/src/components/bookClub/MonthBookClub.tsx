import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { fieldAndHostSelector } from '@/data/fieldAndHostAtom';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import MonthEventCard from '@/components/bookCard/MonthEventCard';
import LabelWithValueCard from '@/components/common/LabelWithValueCard';
import Skeleton from '@/components/common/Skeleton';
import EmptyCard from '@/components/common/container/EmptyCard';

interface MonthBookClubProps {
  yearMonthId: string;
}

export default function MonthBookClub({ yearMonthId }: MonthBookClubProps) {
  const { data: monthlyClub, status } = useRecoilValue(
    clubByMonthSelector(yearMonthId),
  );

  const fieldAndHosts = useRecoilValue(fieldAndHostSelector(yearMonthId));

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const labelList = monthlyClub && [
    {
      label: '모임시간' as const,
      value: monthlyClub.meeting?.time,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '모임장소' as const,
      value: monthlyClub.meeting?.place,
      editable: true && pathname === '/bookclub',
    },
    {
      label: monthlyClub.meeting?.eventMonth
        ? ('진행자' as const)
        : ('발제자' as const),
      value: monthlyClub.meeting?.eventMonth
        ? monthlyClub.meeting?.eventMonth?.hosts
        : fieldAndHosts?.hosts,
    },
  ];

  return (
    <>
      {status === 'isLoading' && (
        <div className="grid grid-cols-2 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
          <Skeleton className="h-[164px]" />

          <div className="col-span-1 flex flex-col gap-3">
            {[1, 2, 3].map(num => (
              <Skeleton key={num} />
            ))}
          </div>
        </div>
      )}
      {status === 'loaded' &&
        (monthlyClub ? (
          <div className="grid grid-cols-2 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
            {monthlyClub.book ? (
              <MonthBookCard yearMonthId={yearMonthId} />
            ) : (
              <MonthEventCard yearMonthId={yearMonthId} />
            )}

            <ul className="col-span-1 flex flex-col gap-3">
              {labelList.map(({ label, value }) => (
                <li key={label}>
                  <LabelWithValueCard
                    label={label}
                    value={value}
                    editable={false}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyCard
            text="아직 등록된 모임책이 없어요."
            createBtnTitle="모임책 등록하기"
            onCreateClick={() =>
              navigate('/search', {
                state: { registerYearMonth: yearMonthId },
              })
            }
          />
        ))}
    </>
  );
}
