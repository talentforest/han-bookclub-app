import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IBookApi {
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

export const recommendBookState = atom<IRecommendedBook>({
  key: `recommendBook${v4()}`,
  default: {
    thumbnail: '',
    title: '',
    authors: [],
    url: '',
  },
});

export const bookDescState = atom<IBookApi>({
  key: `bookDesc${v4()}`,
  default: null,
});

export const searchListState = atom<IBookApi[]>({
  key: `searchList${v4()}`,
  default: [],
});
