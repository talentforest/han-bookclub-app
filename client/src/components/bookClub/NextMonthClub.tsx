import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { clubByMonthSelector, clubByYearAtom } from 'data/clubAtom';
import { nextMonthFieldAndHostSelector } from 'data/fieldAndHostAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import { formatDate, getNextMonthId } from 'utils';

import MonthBookCard from 'components/bookCard/MonthBookCard';
import EmptyCard from 'components/common/container/EmptyCard';

export default function NextMonthClub() {
  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const nextMonthFieldAndHost = useRecoilValue(nextMonthFieldAndHostSelector);

  const nextClub = useRecoilValue(clubByMonthSelector(getNextMonthId()));

  const navigate = useNavigate();

  const { book: nextBook, id: nextMonthId } = nextClub || {};

  const { field } = nextMonthFieldAndHost || {};

  useEffect(() => {
    if (!nextClub) {
      getCollection(BOOKCLUB_THIS_YEAR, setThisYearClub);
    }
  }, [nextClub]);

  return (
    <>
      {nextBook ? (
        <MonthBookCard
          month={formatDate(nextMonthId, 'M')}
          book={nextBook}
          bookFields={field}
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
