import { useEffect, useMemo, useState } from 'react';

import { useRecoilState } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { thisYear } from '@/utils';

export const useGetClubByYear = () => {
  const [selectedYear, setSelectedYear] = useState(thisYear);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
  }, [selectedYear]);

  const clubBookListByYear = useMemo(() => {
    return clubByYear.filter(({ book }) => book).map(({ book }) => book);
  }, [clubByYear]);

  return {
    clubByYear,
    selectedYear,
    setSelectedYear,
    clubBookListByYear,
  };
};
