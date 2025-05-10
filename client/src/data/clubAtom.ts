import { atom, selectorFamily } from 'recoil';

import { ISearchedBook } from './bookAtom';
import { thisYear } from 'utils';
import { v4 } from 'uuid';

export type IBookClub = {
  id?: string;
  creatorId: string;
  createdAt: string;
  book: ISearchedBook;
  meeting: {
    time: string;
    place: string;
  };
};

export const selectedYearAtom = atom<string>({
  key: `selectedYearAtom/${v4()}`,
  default: thisYear,
});

export const clubByYearAtom = atom<IBookClub[]>({
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
