import { v4 } from 'uuid';

import { atom, selectorFamily } from 'recoil';

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
      const thisClubs = get(clubByYearAtom);
      const nextClubs = get(clubByNextYearAtom);

      const clubs =
        nextYear === yearMonthId.slice(0, 4) ? nextClubs : thisClubs;

      return clubs.find(({ id }) => id === yearMonthId) || null;
    },
});
