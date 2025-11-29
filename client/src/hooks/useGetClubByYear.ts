import { useEffect, useMemo, useState } from 'react';

import { useRecoilState } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { thisYear } from '@/utils';

import { BookData } from '@/types';

export const useGetClubByYear = () => {
  const [selectedYear, setSelectedYear] = useState(thisYear);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
  }, [selectedYear]);

  const clubBookListByYear: (BookData & { yearMonthId: string })[] =
    useMemo(() => {
      return clubByYear
        .filter(item => item?.book)
        .filter(({ book }) => book.thumbnail !== '')
        .map(clubBookList => ({
          ...clubBookList.book,
          yearMonthId: clubBookList.id,
        }));
    }, [clubByYear]);

  return {
    clubByYear,
    selectedYear,
    setSelectedYear,
    clubBookListByYear,
  };
};
