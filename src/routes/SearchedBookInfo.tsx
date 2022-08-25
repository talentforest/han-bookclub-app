import { bookSearchHandler } from "api/searchBookApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "theme/commonStyle";
import BookDesc from "components/common/BookDesc";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import RegisterClubBookButton from "components/search/RegisterClubBookButton";
import RegisterRecommendButton from "components/search/RegisterRecommendButton";

const SearchedBookInfo = () => {
  const [bookInfo, setBookInfo] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    bookSearchHandler(id, true, setBookInfo);

    return () => {
      bookSearchHandler(id, true, setBookInfo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <BookTitleImgBox docData={bookInfo[0]} />
      <RegisterClubBookButton findbookData={bookInfo[0]} />
      <RegisterRecommendButton findbookData={bookInfo[0]} />
      <BookDesc bookInfo={bookInfo[0]} />
    </Container>
  );
};

export default SearchedBookInfo;
