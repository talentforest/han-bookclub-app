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
      <BookTitleImgBox
        thumbnail={bookInfo[0]?.thumbnail}
        title={bookInfo[0]?.title}
      />
      <RegisterClubBookButton findbookData={bookInfo[0]} />
      <RegisterRecommendButton findbookData={bookInfo[0]} />
      <BookDesc detailInfo={bookInfo[0]} />
    </Container>
  );
};

export default SearchedBookInfo;
