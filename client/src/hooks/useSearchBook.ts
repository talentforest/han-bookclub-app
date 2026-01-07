import { useRef, useState } from 'react';

import { searchBookHandler } from '@/api';

import { BookData } from '@/types';

export const useSearchBook = () => {
  const [searchList, setSearchList] = useState<BookData[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

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
    resetSearchList,
  };
};
