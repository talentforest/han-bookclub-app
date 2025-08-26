import { atom, selectorFamily } from 'recoil';

import { MonthlyBookClub } from '@/types';
import { thisYear } from '@/utils';
import { v4 } from 'uuid';

export const selectedYearAtom = atom<string>({
  key: `selectedYearAtom/${v4()}`,
  default: thisYear,
});

export const clubByYearAtom = atom<MonthlyBookClub[]>({
  key: `clubByYearAtom/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = 'clubByYear';

      const savedValue = localStorage.getItem(bookMeetingStoreKey);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(bookMeetingStoreKey)
          : localStorage.setItem(bookMeetingStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const clubByMonthSelector = selectorFamily({
  key: 'clubByMonthSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const clubs = get(clubByYearAtom);
      return clubs.find(({ id }) => id === yearMonthId) || null;
    },
});
