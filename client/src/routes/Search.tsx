import styled from 'styled-components';
import device from 'theme/mediaQueries';

import { useEffect, useRef } from 'react';

import useSearchBook from 'hooks/useSearchBook';

import MobileHeader from 'layout/mobile/MobileHeader';

import SquareBtn from 'components/atoms/button/SquareBtn';
import RefInput from 'components/atoms/input/RefInput';
import BookClubNextMonthBox from 'components/molecules/BookClubNextMonthBox';
import SearchedBookBox from 'components/molecules/SearchedBookBox';

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
        <BookClubNextMonthBox />
        <Form>
          <RefInput
            ref={inputRef}
            placeholder="등록하실 책을 검색해주세요."
            onChange={onBookQueryChange}
          />
          <SquareBtn name="검색" />
        </Form>

        <BookResults>
          <span>검색결과 {searchList.length}건</span>
          <p>최대 10건이 검색됩니다.</p>

          {searchList.map((searchedBook, index) => (
            <SearchedBookBox
              key={`${searchedBook.isbn}-${index}`}
              searchedBook={searchedBook}
            />
          ))}
        </BookResults>
      </main>
    </>
  );
};

const BookResults = styled.section`
  padding: 10px 0;
  > span {
    display: block;
    padding-bottom: 5px;
    font-size: 16px;
  }
  > p {
    display: block;
    padding-bottom: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.blue1};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  height: 50px;
  gap: 5px;
  margin-top: 10px;
  input {
    height: inherit;
    min-width: 150px;
    width: 100%;
  }
  button {
    width: 90px;
  }
  @media ${device.tablet} {
    button {
      width: 150px;
    }
  }
`;

export default Search;
