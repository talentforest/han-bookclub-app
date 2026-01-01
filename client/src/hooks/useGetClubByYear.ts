import { useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { clubListByYearAtom } from '@/data/clubAtom';

import { BaseBookData } from '@/types';

export const useGetClubByYear = (year: string) => {
  const [selectedYear, setSelectedYear] = useState(year);

  const clubByYear = useRecoilValue(clubListByYearAtom(selectedYear));

  const clubBookListByYear: (BaseBookData & { yearMonthId: string })[] =
    useMemo(() => {
      return clubByYear
        ?.filter(item => item?.book)
        .filter(({ book }) => book.thumbnail !== '')
        .map(
          ({
            book: { title, url, publisher, authors, thumbnail },
            id: yearMonthId,
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
