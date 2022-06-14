import { Container, Header } from "theme/commonStyle";
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
import BookTitleImgBox from "components/common/BookTitleImgBox";

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
  const [showBookDetail, setShowBookDetail] = useState(false);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  const docMonth = bookMeetingDocData[0]?.id;

  useEffect(() => {
    getBookMeetingInfoData(setBookMeetingDocData);
    getReviews(docMonth, setThisMonthReviews);
    bookMeetingDocData.length && getSubjects(docMonth, setThisMonthSubjects);

    return () => {
      getBookMeetingInfoData(setBookMeetingDocData);
      bookMeetingDocData.length && getReviews(docMonth, setThisMonthReviews);
      getSubjects(docMonth, setThisMonthSubjects);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onModalOpen = () => {
    setShowBookDetail((prev) => !prev);
  };

  return (
    <>
      <NewHeader>
        <Title title="의 책모임" />
        <Link to="find">이달의 책 등록하기</Link>
      </NewHeader>
      <Container>
        <MeetingBox>
          <BookTitleImgBox
            docData={bookMeetingDocData[0]?.book}
            onModalOpen={onModalOpen}
          />
          {showBookDetail && (
            <BookDetail>
              <Overlay onClick={onModalOpen} />
              <BookDesc bookInfo={bookMeetingDocData[0]?.book} />
            </BookDetail>
          )}
          <EditMeetingInfo docData={bookMeetingDocData[0]} />
        </MeetingBox>
        <CategoryButton>
          <Link to="" className={bookUrlMatch ? "isActive" : null}>
            도서 정보
          </Link>
          <Link to="subject" className={subjectUrlMatch ? "isActive" : null}>
            발제문 참여
          </Link>
          <Link to="review" className={reviewUrlMatch ? "isActive" : null}>
            모임 후기
          </Link>
        </CategoryButton>
        {bookUrlMatch && <BookDesc bookInfo={bookMeetingDocData[0]?.book} />}
        {subjectUrlMatch && (
          <>
            <SubjectCreateModal bookInfo={bookMeetingDocData[0]?.book} />
            {thisMonthSubjects?.map((item) => (
              <Subjects
                item={item}
                key={item.id}
                docMonth={bookMeetingDocData[0].id}
              />
            ))}
          </>
        )}
        {reviewUrlMatch && (
          <>
            <ReviewCreateBox
              bookInfo={bookMeetingDocData[0]?.book}
              docMonth={docMonth}
            />
            {thisMonthReviews?.map((item) => (
              <Reviews
                key={item.id}
                item={item}
                bookInfo={bookMeetingDocData[0]?.book}
              />
            ))}
          </>
        )}
      </Container>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    width: fit-content;
    font-size: 12px;
    color: ${(props) => props.theme.text.lightBlue};
    border: none;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;
  }
`;

const CategoryButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  margin-top: 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    height: 30px;
    border-radius: 30px;
    font-size: 11px;
    font-weight: 700;
    color: #aaa;
    background-color: ${(props) => props.theme.text.lightGray};
    cursor: pointer;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
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
`;

const BookDetail = styled.div`
  border: 1px solid red;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  padding-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default BookMeeting;
