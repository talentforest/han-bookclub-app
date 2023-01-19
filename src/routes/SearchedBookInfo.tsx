import { useLocation } from 'react-router-dom';
import { IBookApi } from 'data/bookAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import BookDesc from 'components/organisms/search/BookDesc';
import BookImgTitle from 'components/atoms/BookImgTitle';
import RegisterRecommendButton from 'components/organisms/search/RegisterRecommendButton';
import RegisterClubBookButton from 'components/organisms/search/RegisterClubBookButton';

type LocationState = { state: { searchedBook: IBookApi } };

const SearchedBookInfo = () => {
  const userData = useRecoilValue(currentUserState);
  const {
    state: { searchedBook },
  } = useLocation() as LocationState;

  return (
    <main>
      <BookImgTitle
        thumbnail={searchedBook.thumbnail}
        title={searchedBook.title}
      />
      {userData.uid === process.env.REACT_APP_ADMIN_KEY && (
        <RegisterClubBookButton searchedBook={searchedBook} />
      )}
      <RegisterRecommendButton searchedBook={searchedBook} />
      <BookDesc detailInfo={searchedBook} />
    </main>
  );
};

export default SearchedBookInfo;
