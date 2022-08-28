import { atom } from "recoil";
import { v4 } from "uuid";

export interface IBookApi {
  title: string;
  contents?: string;
  url?: string;
  isbn?: string;
  datetime?: string;
  authors?: string[];
  publisher?: string;
  translators?: string[];
  price?: number;
  thumbnail: string;
}

export const bookDescState = atom<IBookApi[]>({
  key: `bookDesc${v4()}`,
  default: [],
});

export const recommendBookState = atom<IBookApi>({
  key: `recommendBook${v4()}`,
  default: {
    thumbnail: "",
    title: "",
    authors: [],
  },
});

export const searchListState = atom<IBookApi[]>({
  key: `searchList${v4()}`,
  default: [],
});
