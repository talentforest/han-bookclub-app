import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import BookDesc from "components/common/BookDesc";
import BackButtonHeader from "components/header/BackButtonHeader";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import RegisterClubBookButton from "components/bookfind/RegisterClubBookButton";
import RegisterRecommendButton from "components/bookfind/RegisterRecommendButton";

const FindedBook = () => {
  const userData = useRecoilValue(currentUserState);
  const [findbookData, setFindBookData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    bookSearchHandler(id, true, setFindBookData);

    return () => {
      bookSearchHandler(id, true, setFindBookData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButtonHeader title="도서 정보" />
      <Container>
        <BookTitleImgBox docData={findbookData[0]} />
        {userData.email === "wowo6806@naver.com" ? (
          <RegisterClubBookButton findbookData={findbookData[0]} />
        ) : (
          <></>
        )}
        <RegisterRecommendButton findbookData={findbookData[0]} />
        <BookDesc bookInfo={findbookData[0]} />
      </Container>
    </>
  );
};

export default FindedBook;
