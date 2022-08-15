import { Container } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { getAllRecommends, getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import {
  bookMeetingDocsState,
  recommendDocsState,
  reviewDocsState,
  subjectDocsState,
} from "data/documentsAtom";
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
  const [monthSubjects, setMonthSubjects] = useRecoilState(subjectDocsState);
  const [monthReviews, setMonthReviews] = useRecoilState(reviewDocsState);
  const [monthRecommends, setMonthRecommends] =
    useRecoilState(recommendDocsState);
  const [showBookDetail, setShowBookDetail] = useState(false);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  const { id, book, meeting } = bookMeetingDocs[0];

  const allWrittenByUserDocs =
    monthSubjects.length && monthReviews.length && monthRecommends.length;

  const getAllWrittenbyUserDocs = () => {
    if (allWrittenByUserDocs === 0) {
      getReviews(id, setMonthSubjects);
      getSubjects(id, setMonthReviews);
      getAllRecommends(id, setMonthRecommends);
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllWrittenbyUserDocs();

    return () => {
      getAllWrittenbyUserDocs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onModalOpen = () => {
    setShowBookDetail((prev) => !prev);
  };

  return (
    <>
      <MobileHeader title="이달의 책모임" />
      <Container>
        <Subtitle title={id ? `${id.slice(6)}월의 책` : "월의 책"} />
        <MeetingBox>
          <BookTitleImgBox docData={book} onModalOpen={onModalOpen} />
          <p>도서 이미지를 클릭하시면 상세정보를 보실 수 있습니다.</p>
          <MeetingInfoBox docData={meeting} />
        </MeetingBox>
        {showBookDetail && (
          <BookDetail>
            <Overlay onClick={onModalOpen} />
            <BookDesc bookInfo={book} onModalOpen={onModalOpen} />
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
              thisMonthBook={book}
              docMonth={id}
            />
            {monthRecommends.length !== 0 &&
              monthRecommends?.map((item) => (
                <BookRecomBox key={item.id} item={item} docMonth={id} />
              ))}
          </>
        )}
        {subjectUrlMatch && (
          <>
            <SubjectCreateModal bookInfo={book} docMonth={id} />
            {monthSubjects?.map((item) => (
              <Subjects item={item} key={item.id} docMonth={id} />
            ))}
          </>
        )}
        {reviewUrlMatch && (
          <>
            <ReviewCreateBox bookInfo={book} docMonth={id} />
            {monthReviews?.map((item) => (
              <Reviews
                key={item.id}
                item={item}
                bookInfo={book}
                docMonth={id}
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
