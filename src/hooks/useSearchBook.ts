import { searchBookHandler } from 'api/searchBook';
import { searchListState } from 'data/bookAtom';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

const useSearchBook = () => {
  const [searchList, setSearchList] = useRecoilState(searchListState);

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

  const closeSearchList = () => setSearchList([]);

  return {
    searchInputRef,
    onBookQueryChange,
    searchList,
    setSearchList,
    closeSearchList,
  };
};

export default useSearchBook;
