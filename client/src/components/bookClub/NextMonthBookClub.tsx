import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookClubByYearState } from 'data/bookClubAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import { formatDate, getNextMonthId, thisMonth } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import LabelOnTopCard from 'components/common/LabelOnTopCard';
import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';

export default function NextMonthBookClub() {
  const [thisYearBookClubInfos, setThisYearBookClubInfos] =
    useRecoilState(bookClubByYearState);

  const thisYearHost = useRecoilValue(fieldHostDocState);

  const existNextBookClubDoc = thisYearBookClubInfos.find(
    bookclub => bookclub.id === getNextMonthId(),
  );

  useEffect(() => {
    if (!existNextBookClubDoc) {
      getCollection(BOOKCLUB_THIS_YEAR, setThisYearBookClubInfos);
    }
  }, [existNextBookClubDoc]);

  const nextMonthBookFieldAndHost = thisYearHost.bookFieldAndHostList?.find(
    item => item.month === +thisMonth + 1,
  );

  const { book: nextBook, id: nextMonthId } = existNextBookClubDoc || {};

  const { pathname } = useLocation();

  return (
    <>
      {nextBook && (
        <div className="mt-4 grid grid-cols-5 gap-2.5">
          <MonthBookCard
            month={formatDate(nextMonthId, 'M')}
            book={nextBook}
            bookFields={nextMonthBookFieldAndHost?.field}
            className="col-span-3 h-48"
          />
          <div className="col-span-2 flex flex-col gap-2.5">
            <LabelOnTopCard
              label="모임장소"
              content={existNextBookClubDoc.meeting.place}
              meeting={existNextBookClubDoc.meeting}
              color="purple"
            />
            <LabelOnTopCard
              label="모임시간"
              content={
                formatDate(
                  existNextBookClubDoc.meeting.time,
                  'yyyy.MM.dd a h시 mm분',
                ) ?? ''
              }
              meeting={existNextBookClubDoc.meeting}
              color="purple"
            />
            <LabelOnTopCard
              label="발제자"
              content={nextMonthBookFieldAndHost?.hosts}
              meeting={existNextBookClubDoc.meeting}
              color="purple"
            />
          </div>
        </div>
      )}

      {!nextBook && !pathname.includes('search') && (
        <ChevronRightLinkBtn title="다음 모임책 등록하러 가기" to="/search" />
      )}
    </>
  );
}
