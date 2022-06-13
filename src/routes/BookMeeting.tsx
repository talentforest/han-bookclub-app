import { Container, Header, TopButton } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { BookDocument } from "data/bookAtom";
import {
  getBookMeetingInfoData,
  getReviews,
  getSubjects,
} from "util/getFirebaseDoc";
import Title from "components/common/Title";
import styled from "styled-components";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects from "components/bookmeeting/Subjects";
import EditMeetingInfo from "components/bookmeeting/EditMeetingInfo";
import { thisYearMonth } from "util/constants";
import ThisMonthBookTitleImg from "components/common/ThisMonthBookTitleImg";

interface meetingType {
  time: string;
  place: string;
}

export interface BookMeetingInfo {
  book: BookDocument;
  createdAt: number;
  creatorId: string;
  meeting: meetingType;
  id?: string;
}

const BookMeeting = () => {
  const [bookMeetingDocData, setBookMeetingDocData] = useState([]);
  const [thisMonthSubjects, setThisMonthSubjects] = useState([]);
  const [thisMonthReviews, setThisMonthReviews] = useState([]);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  useEffect(() => {
    getBookMeetingInfoData(setBookMeetingDocData);
    getReviews(thisYearMonth, setThisMonthReviews);
    getSubjects(thisYearMonth, setThisMonthSubjects);

    return () => {
      getBookMeetingInfoData(setBookMeetingDocData);
      getReviews(thisYearMonth, setThisMonthReviews);
      getSubjects(thisYearMonth, setThisMonthSubjects);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NewHeader>
        <Title title="의 책모임" />
        <Link to="find">
          <TopButton>이달의 책 등록하기</TopButton>
        </Link>
      </NewHeader>
      <Container>
        <BookMeetingBox>
          <ThisMonthBookTitleImg docData={bookMeetingDocData} />
          <EditMeetingInfo data={bookMeetingDocData[0]} />
        </BookMeetingBox>
        <BookSection>
          <Link to="">
            <button className={bookUrlMatch ? "isActive" : null}>
              도서 정보
            </button>
          </Link>
          <Link to="subject">
            <button className={subjectUrlMatch ? "isActive" : null}>
              발제문 참여
            </button>
          </Link>
          <Link to="review">
            <button className={reviewUrlMatch ? "isActive" : null}>
              모임 후기
            </button>
          </Link>
        </BookSection>
        {bookUrlMatch ? (
          <BookDesc bookInfo={bookMeetingDocData[0]?.book} />
        ) : null}
        {subjectUrlMatch ? (
          <>
            <SubjectCreateModal bookInfo={bookMeetingDocData[0]?.book} />
            {thisMonthSubjects?.map((item) => (
              <Subjects item={item} key={item.id} />
            ))}
          </>
        ) : null}
        {reviewUrlMatch ? (
          <>
            <ReviewCreateBox bookInfo={bookMeetingDocData[0]?.book} />
            {thisMonthReviews?.map((item) => (
              <Reviews
                key={item.id}
                item={item}
                bookInfo={bookMeetingDocData[0]?.book}
              />
            ))}
          </>
        ) : null}
      </Container>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  margin-top: 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.container.lightBlue};
  a {
    width: 32%;
  }
  button {
    width: 100%;
    font-size: 11px;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    height: 30px;
    color: #aaa;
    background-color: ${(props) => props.theme.text.lightGray};
    cursor: pointer;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
    }
  }
`;

const BookMeetingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export default BookMeeting;
