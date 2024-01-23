import { atom } from 'recoil';
import { v4 } from 'uuid';
import { ISearchedBook } from './bookAtom';

export interface IBookClub {
  id?: string;
  creatorId: string;
  createdAt: number;
  book: ISearchedBook;
  meeting: ISchedule;
}

export interface ISchedule {
  time: number;
  place: string;
}

export const thisMonthBookClubState = atom<IBookClub>({
  key: `thisMonthClub/${v4()}`,
  default: {} as IBookClub,
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'thisMonthClub';
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

export const bookClubByYearState = atom<IBookClub[]>({
  key: `clubInfoByYear/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = 'clubInfoByYear';
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
