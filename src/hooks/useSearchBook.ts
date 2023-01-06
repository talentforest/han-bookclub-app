import { searchBookHandler } from 'api/searchBook';
import { searchListState } from 'data/bookAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const useSearchBook = () => {
  const [searchList, setSearchList] = useRecoilState(searchListState);
  const [bookQuery, setBookQuery] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (bookQuery === '') return;
      searchBookHandler(bookQuery, setSearchList);
      setBookQuery('');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onBookQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBookQuery(event.currentTarget.value);
  };

  return {
    onSubmit,
    bookQuery,
    onBookQueryChange,
    searchList,
  };
};

export default useSearchBook;
