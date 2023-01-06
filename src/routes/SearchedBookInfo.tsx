import { useLocation } from 'react-router-dom';
import { IBookApi } from 'data/bookAtom';
import BookDesc from 'components/organisms/search/BookDesc';
import BookImgTitle from 'components/atoms/BookImgTitle';
import RegisterClubBookButton from 'components/organisms/search/RegisterClubBookButton';
import RegisterRecommendButton from 'components/organisms/search/RegisterRecommendButton';

type LocationState = { state: { searchedBook: IBookApi } };

const SearchedBookInfo = () => {
  const {
    state: { searchedBook },
  } = useLocation() as LocationState;

  return (
    <main>
      <BookImgTitle
        thumbnail={searchedBook.thumbnail}
        title={searchedBook.title}
      />
      <RegisterClubBookButton searchedBook={searchedBook} />
      <RegisterRecommendButton searchedBook={searchedBook} />
      <BookDesc detailInfo={searchedBook} />
    </main>
  );
};

export default SearchedBookInfo;
