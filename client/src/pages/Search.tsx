import { useEffect } from 'react';

import { useSearchBook } from '@/hooks';

import MobileHeader from '@/layout/MobileHeader';

import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import Input from '@/components/common/input/Input';
import SearchedBookCard from '@/components/search/SearchedBookCard';

const Search = () => {
  const { onBookQueryChange, searchList, searchInputRef } = useSearchBook();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <>
      <MobileHeader title="도서 검색" backBtn />

      <main>
        <Section title="책 검색하기">
          <form className="mb-8 flex w-1/2 gap-3 max-sm:mb-4 max-sm:w-full">
            <Input
              ref={searchInputRef}
              placeholder="등록하실 책을 검색해주세요."
              onChange={onBookQueryChange}
              className="flex-1"
            />
            <SquareBtn name="검색하기" className="min-w-fit" />
          </form>

          <span>
            검색결과 {searchList.length}건{' '}
            <span className="text-gray1">(최대 10건이 검색됩니다.)</span>
          </span>

          <ul className="mt-4 columns-2 gap-x-4 max-sm:mt-2 max-sm:columns-1 max-sm:gap-x-0">
            {searchList.map((searchedBook, index) => (
              <li
                key={`${searchedBook.isbn}-${index}`}
                className="mb-4 w-full items-center justify-between"
              >
                <SearchedBookCard searchedBook={searchedBook} />
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
};

export default Search;
