import { Container, Header, TopButton } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { Link, useMatch } from "react-router-dom";
import { bookSearchHandler } from "api/api";
import SubjectBox, { DocumentType } from "components/bookmeeting/Subjects";
import { bookDescState } from "data/bookAtom";
import Title from "components/common/Title";
import BookTitleImage from "components/bookmeeting/BookTitleImage";
import styled from "styled-components";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";

const BookMeeting = () => {
  const [bookData, setBookData] = useRecoilState(bookDescState);
  const [subjects, setSubjects] = useState<DocumentType[]>([]);
  const [reviews, setAllReviews] = useState<DocumentType[]>([]);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  useEffect(() => {
    getAllReviews();
    getAllSubjects();
    if (bookData.length === 0) {
      getThisMonthBookData();
    }
    return () => {
      getThisMonthBookData();
      getAllReviews();
      getAllSubjects();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllReviews = async () => {
    const q = query(
      collection(dbService, "Meeting_Review"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setAllReviews(newArray);
    });
  };

  const getAllSubjects = async () => {
    const q = query(
      collection(dbService, "Book_Subjects"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setSubjects(newArray as DocumentType[]);
    });
  };

  const getThisMonthBookData = async () => {
    const q = query(
      collection(dbService, "Book of the Month"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });

      bookSearchHandler(newArray[0].bookTitle, true, setBookData);
    });
  };

  return (
    <>
      <NewHeader>
        <Title title="의 책모임" />
        <Link to="find">
          <TopButton>책 등록하기</TopButton>
        </Link>
      </NewHeader>
      <Container>
        <BookMeetingInfo>
          <BookTitleImage />
          <MeetingInfoBox />
        </BookMeetingInfo>
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
        {bookUrlMatch ? <BookDesc bookInfo={bookData[0]} /> : null}
        {subjectUrlMatch ? (
          <>
            <SubjectCreateModal bookInfo={bookData[0]} />
            {subjects.map((item) => (
              <SubjectBox item={item} key={item.id} />
            ))}
          </>
        ) : null}
        {reviewUrlMatch ? (
          <>
            <ReviewCreateBox bookInfo={bookData[0]} />
            {reviews.map((item) => (
              <Reviews key={item.id} item={item} />
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

const BookMeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 230px;
  width: fit-content;
  margin: 0 auto;
  > div:last-child {
    background-color: transparent;
    box-shadow: none;
  }
`;

export default BookMeeting;
