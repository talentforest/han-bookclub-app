import {
  BookCoverTitleBox,
  Container,
  Header,
  TopButton,
} from "theme/commonStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link, useMatch } from "react-router-dom";
import { BookDocument } from "data/bookAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import { thisYearMonth } from "util/constants";
import Title from "components/common/Title";
import styled from "styled-components";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects from "components/bookmeeting/Subjects";
import EditMeetingInfo from "components/bookmeeting/EditMeetingInfo";

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
  const [thisMonthBookDocData, setThisMonthBookDocData] = useState([]);
  const [thisMonthSubjects, setThisMonthSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  useEffect(() => {
    getThisMonthBookData();
    getReviewsByBook();
    getSubjectsByBook();

    return () => {
      getThisMonthBookData();
      getReviewsByBook();
      getSubjectsByBook();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReviewsByBook = async () => {
    const q = query(
      collection(dbService, `BookMeeting Info/${thisYearMonth}/reviews`),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });

      setReviews(newArray);
    });
  };

  const getSubjectsByBook = async () => {
    const q = query(
      collection(dbService, `BookMeeting Info/${thisYearMonth}/subjects`),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });

      setThisMonthSubjects(newArray);
    });
  };

  const getThisMonthBookData = async () => {
    const q = query(
      collection(dbService, "BookMeeting Info"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as BookMeetingInfo;
      });
      const thisMonthBook = newArray.filter(
        (item) => item.id === thisYearMonth
      );

      setThisMonthBookDocData(thisMonthBook);
    });
  };

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
          {thisMonthBookDocData.length ? (
            <BookCoverTitleBox>
              <img
                src={thisMonthBookDocData[0]?.book.thumbnail}
                alt="Book_Image"
              />
              <h3>{thisMonthBookDocData[0]?.book.title}</h3>
            </BookCoverTitleBox>
          ) : (
            <EmptySign>
              등록된 책이
              <br />
              없습니다.
            </EmptySign>
          )}
          <EditMeetingInfo data={thisMonthBookDocData[0]} />
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
          <BookDesc bookInfo={thisMonthBookDocData[0]?.book} />
        ) : null}
        {subjectUrlMatch ? (
          <>
            <SubjectCreateModal bookInfo={thisMonthBookDocData[0]?.book} />
            {thisMonthSubjects?.map((item) => (
              <Subjects item={item} key={item.id} />
            ))}
          </>
        ) : null}
        {reviewUrlMatch ? (
          <>
            <ReviewCreateBox bookInfo={thisMonthBookDocData[0]?.book} />
            {reviews?.map((item) => (
              <Reviews
                key={item.id}
                item={item}
                bookInfo={thisMonthBookDocData[0]?.book}
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

const EmptySign = styled.div`
  text-align: center;
  height: 130px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
`;

export default BookMeeting;
