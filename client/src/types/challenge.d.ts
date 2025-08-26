/** 챌린지 관련 타입 */
import { BookData } from '@/types/book';

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
  [key: string]: {
    book: Pick<BookData, 'title' | 'thumbnail' | 'publisher' | 'authors'>;
    impressionList: {
      id: number;
      text: string;
      createdAt: string;
    }[];
    counts: number;
  };
};

export type ChallengeRank = {
  creatorId: string;
  id: string;
  rank: number;
  totalCounts: number;
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
