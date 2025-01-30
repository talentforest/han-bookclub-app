import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookClubByYearState } from 'data/bookClubAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import { formatDate, getNextMonthId, thisMonth } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import EmptyCard from 'components/common/container/EmptyCard';

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

  const navigate = useNavigate();

  return (
    <>
      {nextBook ? (
        <MonthBookCard
          month={formatDate(nextMonthId, 'M')}
          book={nextBook}
          bookFields={nextMonthBookFieldAndHost?.field}
          className="col-span-3"
        />
      ) : (
        <EmptyCard
          text="아직 등록된 모임책이 없어요."
          createBtnTitle="모임책 등록하러 가기"
          onCreateClick={() => navigate('/search')}
        />
      )}
    </>
  );
}
