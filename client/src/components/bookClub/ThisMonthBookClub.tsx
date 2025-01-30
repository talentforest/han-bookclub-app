import { useEffect } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { thisMonthBookClubState } from 'data/bookClubAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { useRecoilState } from 'recoil';

import { BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST } from 'appConstants';
import { formatDate, thisMonth, thisYearMonthId } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import LabelOnTopCard from 'components/common/LabelOnTopCard';
import EmptyCard from 'components/common/container/EmptyCard';

export default function ThisMonthBookClub() {
  const [thisMonthBookClub, setThisMonthBookClub] = useRecoilState(
    thisMonthBookClubState,
  );

  const [thisYearHost, setThisYearHost] = useRecoilState(fieldHostDocState);

  const { book, meeting, id } = thisMonthBookClub;

  useEffect(() => {
    getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthBookClub);
    getDocument(BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST, setThisYearHost);
  }, []);

  const thisMonthBookFieldAndHost = thisYearHost.bookFieldAndHostList?.find(
    item => item.month === +thisMonth,
  );

  const thisMonthClubInfoList = [
    {
      label: '모임장소',
      value: meeting?.place,
    },
    {
      label: '모임시간',
      value: meeting?.time
        ? formatDate(meeting?.time, 'yyyy.MM.dd a h시 mm분')
        : '',
    },
    {
      label: '발제자',
      value: thisMonthBookFieldAndHost?.hosts,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2.5 max-sm:flex max-sm:flex-col">
      {book ? (
        <MonthBookCard
          month={formatDate(id, 'M')}
          book={book}
          bookFields={thisMonthBookFieldAndHost?.field}
          className="col-span-3"
        />
      ) : (
        <EmptyCard text="아직 등록된 모임책이 없어요." />
      )}

      <div className="col-span-2 flex flex-col gap-2.5">
        {thisMonthClubInfoList.map(({ label, value }) => (
          <LabelOnTopCard
            key={label}
            label={label}
            content={value}
            meeting={meeting}
          />
        ))}
      </div>
    </div>
  );
}
