import { atom } from "recoil";
import { v4 } from "uuid";

export interface BookDocument {
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

export const bookDescState = atom<BookDocument[]>({
  key: `bookDesc${v4()}`,
  default: [],
});
