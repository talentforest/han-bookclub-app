import { useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { clubListByYearAtom, selectedClubYearAtom } from '@/data/clubAtom';

import { BaseBookData } from '@/types';

export const useGetClubByYear = (year?: string) => {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedClubYearAtom);

  useEffect(() => {
    if (year) {
      setSelectedYear(year);
    }
  }, []);

  const { data: clubByYear } = useRecoilValue(clubListByYearAtom(selectedYear));

  const clubBookListByYear: (BaseBookData & { yearMonthId: string })[] =
    useMemo(() => {
      if (!clubByYear) return [];
      return clubByYear
        ?.filter(item => item?.book)
        .filter(({ book }) => book.thumbnail !== '')
        .map(
          ({
            book: { title, url, publisher, authors, thumbnail },
            docId: yearMonthId,
          }) => ({ title, url, publisher, authors, thumbnail, yearMonthId }),
        );
    }, [clubByYear]);

  return {
    clubByYear,
    selectedYear,
    setSelectedYear,
    clubBookListByYear,
  };
};
