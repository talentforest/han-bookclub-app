import { useEffect, useRef } from 'react';

import { useSearchBook } from '@/hooks';

import MobileHeader from '@/layout/mobile/MobileHeader';

import Subtitle from '@/components/common/Subtitle';
import SquareBtn from '@/components/common/button/SquareBtn';
import RefInput from '@/components/common/input/RefInput';
import SearchedBookCard from '@/components/search/SearchedBookCard';

const Search = () => {
  const {
    onBookQueryChange,
    searchList,
    setSearchList, //
  } = useSearchBook();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchList([]);
    inputRef.current.focus();
  }, []);

  return (
    <>
      <MobileHeader title="도서 검색" backBtn />

      <main>
        <Subtitle title="책 검색하기" />
        <form className="mb-8 flex w-1/2 gap-3 max-sm:mb-4 max-sm:w-full">
          <RefInput
            ref={inputRef}
            placeholder="등록하실 책을 검색해주세요."
            onChange={onBookQueryChange}
          />
          <SquareBtn name="검색하기" />
        </form>

        <span>
          검색결과 {searchList.length}건{' '}
          <span className="text-gray1">(최대 10건이 검색됩니다.)</span>
        </span>

        <ul className="mt-4 columns-2 gap-x-4 max-sm:mt-2 max-sm:columns-1 max-sm:gap-x-0">
          {searchList.map(searchedBook => (
            <li
              key={`${searchedBook.isbn}-${searchedBook.publisher}`}
              className="mb-4 w-full items-center justify-between"
            >
              <SearchedBookCard searchedBook={searchedBook} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Search;
