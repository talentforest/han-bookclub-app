import { v4 } from 'uuid';

import { atom, atomFamily, selectorFamily } from 'recoil';

import { getCollection, getDocument } from '@/api';

import { MonthlyBookClub } from '@/types';

export const basePhotoAtom = atom<string>({
  key: `basePhotoAtom/${v4()}`,
  default: null,
});

export const clubListByYearAtom = atomFamily<MonthlyBookClub[] | null, string>({
  key: `clubListByYearAtom/${v4()}`,
  default: null,
  effects: (year: string) => [
    ({ setSelf }) => {
      const fetchData = async () => {
        getCollection(`BookClub-${year}`, setSelf);
      };
      fetchData();
    },
  ],
});

export const clubByMonthSelector = selectorFamily({
  key: 'clubByMonthSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = yearMonthId.slice(0, 4);
      const clubListByYear = get(clubListByYearAtom(year));
      const monthClub = clubListByYear?.find(({ id }) => id === yearMonthId);

      return monthClub;
    },
});

export const clubByYearMonthIdListAtomFamily = atomFamily<
  MonthlyBookClub[],
  string[]
>({
  key: `clubByYearMonthIdListSelector/${v4()}`,
  default: null,
  effects: (yearMonthIdList: string[]) => [
    ({ setSelf }) => {
      const fetchData = async () => {
        if (!yearMonthIdList || yearMonthIdList.length === 0) return;

        yearMonthIdList.map(yearMonthId => {
          const year = yearMonthId.slice(0, 4);

          getDocument(
            `BookClub-${year}`,
            yearMonthId,
            (param: MonthlyBookClub) => {
              setSelf((prev: any) => {
                if (!prev) return [param];
                return [...prev, param];
              });
            },
          );
        });
      };
      fetchData();
    },
  ],
});
