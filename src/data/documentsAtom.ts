import { atom } from 'recoil';
import { v4 } from 'uuid';
import { IBookApi, IRecommendedBook } from './bookAtom';
import { IVote } from './voteItemAtom';

export interface IBookClubInfo {
  id?: string;
  creatorId: string;
  createdAt: number;
  book: IBookApi;
  meeting: ISchedule;
}

export interface ISchedule {
  time: number;
  place: string;
}

export interface IDocument {
  id?: string;
  text: string;
  creatorId: string;
  createdAt: number;
  title: string;
  thumbnail: string;
  recommendedBook?: IRecommendedBook;
  likes?: number;
  likeUsers?: string[];
  rating?: number;
}

export const thisYearClubInfoState = atom<IBookClubInfo[]>({
  key: `thisYearClubInfo/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = 'thisYearClubInfo';
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

export const clubInfoByYearState = atom<IBookClubInfo[]>({
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

export const thisMonthClubState = atom<IBookClubInfo>({
  key: `thisMonthClub/${v4()}`,
  default: {} as IBookClubInfo,
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
