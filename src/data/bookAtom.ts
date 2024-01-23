import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface ISearchedBook {
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
}

export interface IRecommendedBook {
  thumbnail: string;
  title: string;
  authors: string[];
  url: string;
}

export interface IChallenge {
  id?: string;
  createdAt: number;
  creatorId: string;
  books: ISearchedBook[];
  wholePage: number;
  currentPage: number;
}

export const recommendBookState = atom<IRecommendedBook>({
  key: `recommendBook${v4()}`,
  default: {
    thumbnail: '',
    title: '',
    authors: [],
    url: '',
  },
});

export const bookDescState = atom<ISearchedBook>({
  key: `bookDesc${v4()}`,
  default: null,
});

export const searchListState = atom<ISearchedBook[]>({
  key: `searchList${v4()}`,
  default: [],
});

export const challengeState = atom<IChallenge[]>({
  key: `challenge/${v4()}`,
  default: null,
});
