import { v4 } from 'uuid';

import { atom, atomFamily, selectorFamily } from 'recoil';

import { getDocument } from '@/api';

import { nextYear, thisYear } from '@/utils';

import { MonthlyBookClub } from '@/types';

export const basePhotoAtom = atom<string>({
  key: `basePhotoAtom/${v4()}`,
  default: null,
});

export const selectedYearAtom = atom<string>({
  key: `selectedYearAtom/${v4()}`,
  default: thisYear,
});

export const clubByMonthAtom = atomFamily({
  key: `clubByMonthAtom/${v4()}`,
  default: null,
  effects: (yearMonthId: string) => [
    ({ setSelf }) => {
      const year = yearMonthId.slice(0, 4);
      const fetchData = async () => {
        getDocument(`BookClub-${year}`, yearMonthId, setSelf);
      };
      fetchData();
    },
  ],
});

export const clubByYearAtom = atom<MonthlyBookClub[]>({
  key: `clubByYearAtom/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'clubByYear';

      const savedValue = localStorage.getItem(storeKey);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const clubByNextYearAtom = atom<MonthlyBookClub[]>({
  key: `clubByNextYearAtom/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'clubByNextYear';

      const savedValue = localStorage.getItem(storeKey);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const clubByMonthSelector = selectorFamily({
  key: 'clubByMonthSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = +yearMonthId.slice(0, 4);

      if (+thisYear <= year) {
        const thisClubs = get(clubByYearAtom);
        const nextClubs = get(clubByNextYearAtom);

        const clubs = +nextYear === year ? nextClubs : thisClubs;
        return clubs.find(({ id }) => id === yearMonthId) || null;
      }

      const monthClub = get(clubByMonthAtom(yearMonthId));
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
