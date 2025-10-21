/** 챌린지 관련 타입 */
import { BaseBookData, BookData } from '@/types/book';

export type CompleteReadingChallengeBook = {
  currentPage: number;
  wholePage: number;
} & Book;

export type CompleteReadingChallenge = {
  id?: string;
  createdAt: string;
  creatorId: string;
  books: CompleteReadingChallengeBook[];
};

export type RereadingChallenge = {
  id: string;
  creatorId: string;
  [key: string]: {
    yearMonthId: string;
    book: Omit<BaseBookData, 'url'>;
    impressionList: {
      id: number;
      text: string;
      createdAt: string;
    }[];
    counts: number;
  };
};

export type ChallengeSentence = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  creatorId: string;
  text: string;
  page: number;
  likeUsers?: string[];
  likes?: number;
};

export type BookWithRank = Omit<BaseBookData, 'url'> & {
  counts: number;
  readers: number;
  impressionList: {
    id: number;
    text: string;
    createdAt: string;
    creatorId: string;
  }[];
};

export type UserRank = {
  creatorId: string;
  rank: number;
  rereadingBookList: ({ counts: number } & Omit<BaseBookData, 'url'>)[];
  totalRereadingCounts: number;
};
