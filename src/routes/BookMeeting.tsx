import { Container } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { getAllRecommends, getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { bookMeetingDocsState } from "data/documentsAtom";
import Subjects from "components/bookmeeting/Subjects";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import Subtitle from "components/common/Subtitle";
import MobileHeader from "components/header/MobileHeader";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import SubjectCreateModal, {
  Overlay,
} from "components/bookmeeting/SubjectCreateModal";
import device from "theme/mediaQueries";
import styled from "styled-components";

const BookMeeting = () => {
  const userData = useRecoilValue(currentUserState);
  const bookMeetingDocs = useRecoilValue(bookMeetingDocsState);
  const [thisMonthSubjects, setThisMonthSubjects] = useState([]);
  const [thisMonthReviews, setThisMonthReviews] = useState([]);
  const [showBookDetail, setShowBookDetail] = useState(false);
  const [recommendBook, setRecommendBook] = useState([]);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  const docMonth = bookMeetingDocs[0]?.id;

  const getAllDocsRelatedBook = () => {
    getReviews(docMonth, setThisMonthReviews);
    getSubjects(docMonth, setThisMonthSubjects);
    getAllRecommends(docMonth, setRecommendBook);
  };

  useEffect(() => {
    getAllDocsRelatedBook();
    return () => {
      getAllDocsRelatedBook();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeetingDocs[0]?.id]);

  const onModalOpen = () => {
    setShowBookDetail((prev) => !prev);
  };

  return (
    <>
      <MobileHeader title="이달의 책모임" />
      <Container>
        <Subtitle
          title={docMonth ? `${docMonth?.slice(6)}월의 책` : "월의 책"}
        />
        <MeetingBox>
          <BookTitleImgBox
            docData={bookMeetingDocs[0]?.book}
            onModalOpen={onModalOpen}
          />
          <p>도서 이미지를 클릭하시면 상세정보를 보실 수 있습니다.</p>
          <MeetingInfoBox docData={bookMeetingDocs[0]?.meeting} />
        </MeetingBox>
        {showBookDetail && (
          <BookDetail>
            <Overlay onClick={onModalOpen} />
            <BookDesc
              bookInfo={bookMeetingDocs[0]?.book}
              onModalOpen={onModalOpen}
            />
          </BookDetail>
        )}
        <CategoryButton>
          <Link to="" className={bookUrlMatch && "isActive"}>
            추천책
          </Link>
          <Link to="subject" className={subjectUrlMatch && "isActive"}>
            발제문 작성
          </Link>
          <Link to="review" className={reviewUrlMatch && "isActive"}>
            모임 후기
          </Link>
        </CategoryButton>
        {bookUrlMatch && (
          <>
            <BookRecomCreateBox
              uid={userData?.uid}
              thisMonthBook={bookMeetingDocs[0]?.book}
              docMonth={bookMeetingDocs[0]?.id}
            />
            {recommendBook.length !== 0 &&
              recommendBook?.map((item) => (
                <BookRecomBox
                  key={item.id}
                  item={item}
                  docMonth={bookMeetingDocs[0]?.id}
                />
              ))}
          </>
        )}
        {subjectUrlMatch && (
          <>
            <SubjectCreateModal
              bookInfo={bookMeetingDocs[0]?.book}
              docMonth={bookMeetingDocs[0]?.id}
            />
            {thisMonthSubjects?.map((item) => (
              <Subjects
                item={item}
                key={item.id}
                docMonth={bookMeetingDocs[0]?.id}
              />
            ))}
          </>
        )}
        {reviewUrlMatch && (
          <>
            <ReviewCreateBox
              bookInfo={bookMeetingDocs[0]?.book}
              docMonth={bookMeetingDocs[0]?.id}
            />
            {thisMonthReviews?.map((item) => (
              <Reviews
                key={item.id}
                item={item}
                bookInfo={bookMeetingDocs[0]?.book}
                docMonth={bookMeetingDocs[0]?.id}
              />
            ))}
          </>
        )}
      </Container>
    </>
  );
};

const CategoryButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  margin: 25px 0 20px;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    height: 36px;
    border-radius: 80px;
    font-size: 14px;
    font-weight: 700;
    color: #aaa;
    cursor: pointer;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
    }
  }
  @media ${device.tablet} {
    height: 50px;
    border-radius: 30px;
    > a {
      height: 100%;
      font-size: 16px;
    }
  }
`;

const MeetingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  > div {
    img {
      cursor: pointer;
    }
  }
  > p {
    font-size: 13px;
    color: ${(props) => props.theme.text.gray};
  }
`;

const BookDetail = styled.div`
  z-index: 1;
  position: fixed;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  > ul {
    z-index: 2;
    position: fixed;
    top: 30px;
    right: 0;
    left: 0;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
  }
`;

export default BookMeeting;
