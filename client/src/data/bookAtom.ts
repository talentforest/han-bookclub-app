import { atom } from 'recoil';

import { BaseBookData, BookData } from '@/types';
import { v4 } from 'uuid';

export const recommendedBookAtom = atom<BaseBookData>({
  key: `recommendedBook/${v4()}`,
  default: {
    thumbnail: '',
    title: '',
    authors: [],
    url: '',
    publisher: '',
  },
});

export const bookDescState = atom<BookData>({
  key: `bookDesc${v4()}`,
  default: null,
});

export const searchListAtom = atom<BookData[]>({
  key: `searchList${v4()}`,
  default: [],
});
