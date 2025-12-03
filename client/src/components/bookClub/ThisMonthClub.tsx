import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';

import { getDocument } from '@/api';

import { BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST } from '@/appConstants';

import { thisMonth, thisYearMonthId } from '@/utils';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import MonthEventCard from '@/components/bookCard/MonthEventCard';
import LabelWithValueCard from '@/components/common/LabelWithValueCard';
import EmptyCard from '@/components/common/container/EmptyCard';

export default function ThisMonthClub() {
  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const [fieldAndHosts, setFieldAndHosts] = useRecoilState(fieldAndHostAtom);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { bookFieldAndHostList } = fieldAndHosts;

  const fieldAndHost = bookFieldAndHostList?.find(
    ({ month }) => month === +thisMonth,
  );

  useEffect(() => {
    if (fieldAndHosts.bookFieldAndHostList.length === 0) {
      getDocument(BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST, setFieldAndHosts);
    }
  }, []);

  const thisMonthClubInfoList = thisMonthClub && [
    {
      label: '모임시간' as const,
      value: thisMonthClub.meeting?.time,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '모임장소' as const,
      value: thisMonthClub.meeting?.place,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '발제자' as const,
      value: fieldAndHost?.hosts,
    },
  ];

  return (
    <>
      {thisMonthClub ? (
        thisMonthClub?.book ? (
          <div className="grid grid-cols-2 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
            <MonthBookCard
              month={`${+thisMonth}`}
              book={thisMonthClub.book}
              bookFields={fieldAndHost?.field}
              className="col-span-1"
            />
            <div className="col-span-1 flex flex-col gap-4">
              {thisMonthClubInfoList.map(({ label, value, editable }) => (
                <LabelWithValueCard
                  key={label}
                  label={label}
                  value={value}
                  editable={editable}
                />
              ))}
            </div>
          </div>
        ) : (
          <MonthEventCard
            yearMonthId={thisYearMonthId}
            event={thisMonthClub.meeting}
          />
        )
      ) : (
        <EmptyCard
          text="아직 등록된 이번달 모임책이 없어요."
          createBtnTitle="이번달 모임책 등록하기"
          onCreateClick={() =>
            navigate('/search', {
              state: { registerYearMonth: thisYearMonthId },
            })
          }
        />
      )}
    </>
  );
}
