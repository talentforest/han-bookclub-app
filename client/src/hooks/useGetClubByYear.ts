import { useEffect, useMemo, useState } from 'react';

import { useRecoilState } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { thisYear } from '@/utils';

import { BaseBookData } from '@/types';

export const useGetClubByYear = () => {
  const [selectedYear, setSelectedYear] = useState(thisYear);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
  }, [selectedYear]);

  const clubBookListByYear: (BaseBookData & { yearMonthId: string })[] =
    useMemo(() => {
      return clubByYear
        .filter(item => item?.book)
        .filter(({ book }) => book.thumbnail !== '')
        .map(
          ({
            book: { title, url, publisher, authors, thumbnail },
            id: yearMonthId,
          }) => ({
            title,
            url,
            publisher,
            authors,
            thumbnail,
            yearMonthId,
          }),
        );
    }, [clubByYear]);

  return {
    clubByYear,
    selectedYear,
    setSelectedYear,
    clubBookListByYear,
  };
};
