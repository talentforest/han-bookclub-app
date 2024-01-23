import { useLocation } from 'react-router-dom';
import { ISearchedBook } from 'data/bookAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import SearchedBookDesc from 'components/molecules/SearchedBookDesc';
import RegisterClubBookButton from 'components/molecules/RegisterClubBookButton';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import styled from 'styled-components';
import MobileHeader from 'layout/mobile/MobileHeader';

type LocationState = { state: { searchedBook: ISearchedBook } };

const SearchedBookInfo = () => {
  const userData = useRecoilValue(currentUserState);

  const {
    state: { searchedBook },
  } = useLocation() as LocationState;

  const { title, thumbnail } = searchedBook;

  return (
    <>
      <MobileHeader title='도서 정보' backBtn />
      <Main>
        <div className='thumbnailBox'>
          <BookThumbnailImg title={title} thumbnail={thumbnail} />
        </div>

        <h3>《 {title} 》</h3>

        {userData.uid === process.env.REACT_APP_ADMIN_KEY && (
          <RegisterClubBookButton searchedBook={searchedBook} />
        )}

        {searchedBook && <SearchedBookDesc detailInfo={searchedBook} />}
      </Main>
    </>
  );
};

const Main = styled.main`
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
