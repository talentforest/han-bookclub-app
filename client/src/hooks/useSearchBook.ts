import { useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { searchListAtom } from '@/data/bookAtom';

import { searchBookHandler } from '@/api';

import { BookData } from '@/types';

export const useSearchBook = () => {
  const [searchList, setSearchList] =
    useRecoilState<BookData[]>(searchListAtom);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const value = searchInputRef?.current?.value;

  useEffect(() => {
    if (value === '') {
      return setSearchList([]);
    }
  }, []);

  const onBookQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value !== '') {
      searchBookHandler(value, setSearchList);
    } else {
      setSearchList([]);
    }
  };

  const resetSearchList = () => setSearchList([]);

  return {
    searchInputRef,
    onBookQueryChange,
    searchList,
    setSearchList,
    resetSearchList,
  };
};
