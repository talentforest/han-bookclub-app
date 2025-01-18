import { useEffect } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { thisMonthBookClubState } from 'data/bookClubAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { useRecoilState } from 'recoil';

import { BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST } from 'appConstants';
import { formatDate, thisMonth, thisYearMonthId } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import LabelOnTopCard from 'components/common/LabelOnTopCard';

export default function ThisMonthBookClub() {
  const [thisMonthBookClub, setThisMonthBookClub] = useRecoilState(
    thisMonthBookClubState,
  );

  const [thisYearHost, setThisYearHost] = useRecoilState(fieldHostDocState);

  const { book, meeting, id } = thisMonthBookClub;

  useEffect(() => {
    if (!thisMonthBookClub) {
      getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthBookClub);
    }
    getDocument(BOOKCLUB_THIS_YEAR, BOOK_FIELD_AND_HOST, setThisYearHost);
  }, []);

  const thisMonthBookFieldAndHost = thisYearHost.bookFieldAndHostList?.find(
    item => item.month === +thisMonth,
  );

  return (
    <div className="mt-2 grid grid-cols-5 gap-2.5 sm:flex sm:flex-col">
      {book && (
        <MonthBookCard
          month={formatDate(id, 'M')}
          book={book}
          bookFields={thisMonthBookFieldAndHost?.field}
          className="col-span-3 h-48"
        />
      )}

      <div className="col-span-2 flex flex-col gap-2.5">
        <LabelOnTopCard
          label="모임장소"
          content={meeting.place}
          meeting={meeting}
        />
        <LabelOnTopCard
          label="모임시간"
          content={formatDate(meeting.time, 'yyyy.MM.dd a h시 mm분') ?? ''}
          meeting={meeting}
        />
        <LabelOnTopCard
          label="발제자"
          content={thisMonthBookFieldAndHost?.hosts}
          meeting={meeting}
        />
      </div>
    </div>
  );
}
