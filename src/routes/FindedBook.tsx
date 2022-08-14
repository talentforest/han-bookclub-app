import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { getBookMeetingInfoData } from "util/getFirebaseDoc";
import BookDesc from "components/common/BookDesc";
import BackButtonHeader from "components/header/BackButtonHeader";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import RegisterClubBookButton from "components/bookfind/RegisterClubBookButton";
import RegisterRecommendButton from "components/bookfind/RegisterRecommendButton";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";

const FindedBook = () => {
  const [findbookData, setFindBookData] = useState([]);
  const [bookMeetingDocData, setBookMeetingDocData] = useState([]);
  const userData = useRecoilValue(currentUserState);

  const match = useMatch(`/bookmeeting/find/:id`);

  useEffect(() => {
    bookSearchHandler(match?.params.id, true, setFindBookData);
    getBookMeetingInfoData(setBookMeetingDocData);

    return () => {
      bookSearchHandler(match?.params.id, true, setFindBookData);
      getBookMeetingInfoData(setBookMeetingDocData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButtonHeader title="도서 정보" />
      <Container>
        <BookTitleImgBox docData={findbookData[0]} />
        {userData.email === "wowo6806@naver.com" ? (
          <RegisterClubBookButton
            bookMeetingDocData={bookMeetingDocData}
            findbookData={findbookData[0]}
          />
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
