import { atom } from 'recoil';

import { v4 } from 'uuid';

export type ISearchedBook = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  thumbnail: string;
};

export type IRecommendedBook = {
  thumbnail: string;
  title: string;
  authors: string[];
  url: string;
  publisher: string;
};

export type IChallengeBook = {
  currentPage: number;
  wholePage: number;
} & ISearchedBook;

export type IChallenge = {
  id?: string;
  createdAt: string;
  creatorId: string;
  books: IChallengeBook[];
};

export interface ISentence {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  creatorId: string;
  text: string;
  page: number;
  likeUsers?: string[];
  likes?: number;
}

export const recommendedBookAtom = atom<IRecommendedBook>({
  key: `recommendedBook/${v4()}`,
  default: {
    thumbnail: '',
    title: '',
    authors: [],
    url: '',
    publisher: '',
  },
});

export const bookDescState = atom<ISearchedBook>({
  key: `bookDesc${v4()}`,
  default: null,
});

export const searchListAtom = atom<ISearchedBook[]>({
  key: `searchList${v4()}`,
  default: [],
});

export const challengeState = atom<IChallenge>({
  key: `challenge/${v4()}`,
  default: null,
});

export const sentencesState = atom<ISentence[]>({
  key: `sentences/${v4()}`,
  default: null,
});
