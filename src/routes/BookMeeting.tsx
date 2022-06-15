import { Container, Header } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { BookDocument } from "data/bookAtom";
import {
  getAllRecommends,
  getBookMeetingInfoData,
  getReviews,
  getSubjects,
} from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Title from "components/common/Title";
import styled from "styled-components";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects from "components/bookmeeting/Subjects";
import EditMeetingInfo from "components/bookmeeting/EditMeetingInfo";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import { thisYearMonth } from "util/constants";

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
  const [recommendBook, setRecommendBook] = useState([]);
  const userData = useRecoilValue(currentUserState);

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  useEffect(() => {
    getBookMeetingInfoData(setBookMeetingDocData);
    getReviews(thisYearMonth, setThisMonthReviews);
    getSubjects(thisYearMonth, setThisMonthSubjects);
    getAllRecommends(thisYearMonth, setRecommendBook);

    return () => {
      getBookMeetingInfoData(setBookMeetingDocData);
      getSubjects(thisYearMonth, setThisMonthSubjects);
      getReviews(thisYearMonth, setThisMonthReviews);
      getAllRecommends(thisYearMonth, setRecommendBook);
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
          <EditMeetingInfo docData={bookMeetingDocData[0]} />
        </MeetingBox>
        {showBookDetail && (
          <BookDetail>
            <Overlay onClick={onModalOpen} />
            <BookDesc
              bookInfo={bookMeetingDocData[0]?.book}
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
              thisMonthBook={bookMeetingDocData[0]?.book}
            />
            {recommendBook.length !== 0 &&
              recommendBook?.map((item) => (
                <BookRecomBox
                  key={item.id}
                  item={item}
                  thisMonthBook={bookMeetingDocData[0]?.book}
                />
              ))}
          </>
        )}
        {subjectUrlMatch && (
          <>
            <SubjectCreateModal bookInfo={bookMeetingDocData[0]?.book} />
            {thisMonthSubjects?.map((item) => (
              <Subjects item={item} key={item.id} />
            ))}
          </>
        )}
        {reviewUrlMatch && (
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
  margin: 25px 0 20px;
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
  position: fixed;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  > ul {
    position: fixed;
    top: 50px;
    right: 0;
    left: 0;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
  }
`;

const Overlay = styled.div`
  cursor: pointer;
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
