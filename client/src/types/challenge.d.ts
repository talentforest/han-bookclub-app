/** 챌린지 관련 타입 */
import { BaseBookData } from '@/types/book';

export type CompleteReadingChallenge = {
  id?: string;
  createdAt: string;
  creatorId: string;
  books: CompleteReadingChallengeBook[];
};

export type Challenge = {
  docId: string;
  creatorId: string;
  [bookTitle: string]: ChallengeBook;
};

export type ChallengeBook = {
  book: BaseBookData;
  currentPage?: number;
  wholePage?: number;
  readingTimeList: string[];
  impressionList: {
    id: number;
    text: string;
    createdAt: string;
  }[];
  createdAt: string;
};

export type BookImpression = {
  id: number;
  text: string;
  createdAt: string;
  creatorId: string;
};

export type BookRank = BaseBookData & {
  rank: number;
  total: number;
  readerList: string[];
  impressionList: BookImpression[];
};

export type UserRank = {
  rank: number;
  total: number;
  creatorId: string;
  bookList: BaseBookData[];
};

export type ChallengeSentence = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  creatorId: string;
  text: string;
  page: number;
  like: {
    counts: number;
    userList: string[];
  };
};
