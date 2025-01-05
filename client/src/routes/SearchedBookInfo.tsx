import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

import { ISearchedBook } from 'data/bookAtom';

import MobileHeader from 'layout/mobile/MobileHeader';

import BookThumbnail from 'components/atoms/book/BookThumbnail';
import RegisterClubBookBtn from 'components/atoms/button/RegisterClubBookBtn';
import SearchedBookDesc from 'components/organisms/SearchedBookDesc';

type LocationState = { state: { searchedBook: ISearchedBook } };

const SearchedBookInfo = () => {
  const {
    state: { searchedBook },
  } = useLocation() as LocationState;

  const { title, thumbnail } = searchedBook;

  return (
    <>
      <MobileHeader title="도서 정보" backBtn />
      <Main>
        <div className="thumbnailBox">
          <BookThumbnail title={title} thumbnail={thumbnail} />
        </div>

        <h3>《 {title} 》</h3>

        <RegisterClubBookBtn searchedBook={searchedBook} />

        {searchedBook && <SearchedBookDesc detailInfo={searchedBook} />}
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  .thumbnailBox {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    height: 130px;
  }
  > h3 {
    text-align: center;
    margin-bottom: 15px;
  }
`;

export default SearchedBookInfo;
