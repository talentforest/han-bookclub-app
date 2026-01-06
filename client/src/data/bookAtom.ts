import { atom } from 'recoil';

import { BaseBookData, BookData } from '@/types';

export const initialRecommendedBook: BaseBookData = {
  thumbnail: '',
  title: '',
  authors: [],
  url: '',
  publisher: '',
};

export const recommendedBookAtom = atom<BaseBookData>({
  key: 'recommendedBookAtom',
  default: initialRecommendedBook,
});

export const bookDescAtom = atom<BaseBookData | null>({
  key: 'bookDescAtom',
  default: null,
});

export const searchListAtom = atom<BookData[]>({
  key: 'searchListAtom',
  default: [],
});
