import { atom } from 'recoil';
import { v4 } from 'uuid';
import { IBookApi } from './bookAtom';
import { IVote } from './voteItemAtom';

export interface IBookClubMonthInfo {
  id?: string;
  creatorId: string;
  createdAt: number;
  book: IBookApi;
  meeting: ISchedule;
}

export interface ISchedule {
  time: string;
  place: string;
}

export interface IDocument {
  id?: string;
  text: string;
  creatorId: string;
  createdAt: number;
  title: string;
  thumbnail: string;
  recommendBookTitle?: string;
  recommendBookThumbnail?: string;
  recommendBookUrl?: string;
  recommendBookAuthor?: string[];
}

export interface IBookFieldHost {
  field: string;
  month: number;
  host: string;
}

export interface IBookField {
  bookField: IBookFieldHost[];
}

export const clubDocsState = atom<IBookClubMonthInfo[]>({
  key: `clubDocs/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = 'bookMeeting';
      const savedValue = localStorage.getItem(bookMeetingStoreKey);
      if (savedValue != null) {
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

export const thisMonthState = atom<IBookClubMonthInfo>({
  key: `thisMonthBookMeeting/${v4()}`,
  default: {} as IBookClubMonthInfo,
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'thisMonthBookMeeting';
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

export const bookFieldsState = atom<IBookField>({
  key: `bookFieldDocs/${v4()}`,
  default: {} as IBookField,
});

export const votesState = atom<IVote[]>({
  key: `voteDocs/${v4()}`,
  default: [],
});

export const subjectsState = atom<IDocument[]>({
  key: `subjectDocs/${v4()}`,
  default: [],
});

export const reviewsState = atom<IDocument[]>({
  key: `reviewDocs/${v4()}`,
  default: [],
});

export const recommendsState = atom<IDocument[]>({
  key: `recommendDocs/${v4()}`,
  default: [],
});

export const hostReviewState = atom<IDocument[]>({
  key: `hostReview/${v4()}`,
  default: [],
});
