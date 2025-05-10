import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { getDocument } from 'api/firebase/getFbDoc';

import { clubByMonthSelector } from 'data/clubAtom';
import { fieldAndHostAtom } from 'data/fieldAndHostAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST } from 'appConstants';
import { formatDate, thisMonth, thisYearMonthId } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import LabelWithValueCard from 'components/common/LabelWithValueCard';
import EmptyCard from 'components/common/container/EmptyCard';

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
      label: '모임장소',
      value: thisMonthClub.meeting?.place,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '모임시간',
      value: thisMonthClub.meeting?.time,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '발제자',
      value: fieldAndHost?.hosts,
    },
  ];

  return (
    <>
      {thisMonthClub && thisMonthClub?.book ? (
        <div className="grid grid-cols-5 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
          <MonthBookCard
            month={formatDate(thisMonth, 'M')}
            book={thisMonthClub.book}
            bookFields={fieldAndHost?.field}
            className="col-span-3"
          />
          <div className="col-span-2 flex flex-col gap-6 max-sm:gap-4">
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
        <EmptyCard
          text="아직 등록된 이번달 모임책이 없어요."
          createBtnTitle="이번달 모임책 등록하기"
          onCreateClick={() =>
            navigate('/search', { state: { registerMonth: 'thisMonth' } })
          }
        />
      )}
    </>
  );
}
