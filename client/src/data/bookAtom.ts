import { atom } from 'recoil';

import { BaseBookData, BookData } from '@/types';

export const recommendedBookAtom = atom<BaseBookData>({
  key: 'recommendedBookAtom',
  default: {
    thumbnail: '',
    title: '',
    authors: [],
    url: '',
    publisher: '',
  },
});

export const bookDescAtom = atom<BaseBookData>({
  key: 'bookDescAtom',
  default: null,
});

export const searchListAtom = atom<BookData[]>({
  key: 'searchListAtom',
  default: [],
});
