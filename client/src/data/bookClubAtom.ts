import { atom } from 'recoil';

import { ISearchedBook } from './bookAtom';
import { thisYear } from 'utils';
import { v4 } from 'uuid';

export interface IBookClub {
  id?: string;
  creatorId: string;
  createdAt: string;
  book: ISearchedBook;
  meeting: ISchedule;
}

export interface ISchedule {
  time: string;
  place: string;
}

export const thisMonthBookClubState = atom<IBookClub>({
  key: `thisMonthBookClub/${v4()}`,
  default: {} as IBookClub,
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'thisMonthBookClub';
      const savedValue = localStorage.getItem(storeKey);
      if (savedValue != null) {
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

export const selectedYearState = atom<string>({
  key: `selectedYearState/${v4()}`,
  default: thisYear,
});

export const bookClubByYearState = atom<IBookClub[]>({
  key: `bookClubInfoByYear/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = 'bookClubInfoByYear';
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
