import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { getDocument } from 'api/firebase/getFbDoc';

import { thisMonthClubAtom } from 'data/clubAtom';
import { fieldAndHostAtom } from 'data/fieldAndHostAtom';
import { useRecoilState } from 'recoil';

import { BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST } from 'appConstants';
import { formatDate, thisMonth, thisYearMonthId } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import LabelWithValueCard from 'components/common/LabelWithValueCard';
import EmptyCard from 'components/common/container/EmptyCard';

export default function ThisMonthClub() {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubAtom);

  const [fieldAndHosts, setFieldAndHosts] = useRecoilState(fieldAndHostAtom);

  const { pathname } = useLocation();

  const { book, meeting, id } = thisMonthClub;

  const { bookFieldAndHostList } = fieldAndHosts;

  const fieldAndHost = bookFieldAndHostList?.find(
    ({ month }) => month === +thisMonth,
  );

  useEffect(() => {
    getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthClub);
    getDocument(BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST, setFieldAndHosts);
  }, []);

  const thisMonthClubInfoList = [
    {
      label: '모임장소',
      value: meeting?.place,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '모임시간',
      value: meeting?.time,
      editable: true && pathname === '/bookclub',
    },
    {
      label: '발제자',
      value: fieldAndHost?.hosts,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-6 max-sm:flex max-sm:flex-col">
      {book ? (
        <MonthBookCard
          month={formatDate(id, 'M')}
          book={book}
          bookFields={fieldAndHost?.field}
          className="col-span-3"
        />
      ) : (
        <EmptyCard text="아직 등록된 모임책이 없어요." />
      )}

      <div className="col-span-2 flex flex-col gap-4">
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
  );
}
