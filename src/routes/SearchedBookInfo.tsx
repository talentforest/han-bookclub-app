import { useLocation } from "react-router-dom";
import { IBookApi } from "data/bookAtom";
import { Container } from "theme/commonStyle";
import BookDesc from "components/common/BookDesc";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import RegisterClubBookButton from "components/search/RegisterClubBookButton";
import RegisterRecommendButton from "components/search/RegisterRecommendButton";

type LocationState = { state: { searchedBook: IBookApi } };

const SearchedBookInfo = () => {
  const {
    state: { searchedBook },
  } = useLocation() as LocationState;

  return (
    <Container>
      <BookTitleImgBox
        thumbnail={searchedBook.thumbnail}
        title={searchedBook.title}
      />
      <RegisterClubBookButton searchedBook={searchedBook} />
      <RegisterRecommendButton searchedBook={searchedBook} />
      <BookDesc detailInfo={searchedBook} />
    </Container>
  );
};

export default SearchedBookInfo;
