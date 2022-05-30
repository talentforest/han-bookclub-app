import { Container, Header, TopButton } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { LogInUserInfo } from "components/App";
import { Link } from "react-router-dom";
import { bookSearchHandler } from "api/api";
import { DocumentType } from "components/book/SubjectBox";
import { bookDescState } from "data/bookAtom";
import Title from "components/common/Title";
import BookTitleImage from "components/book/BookTitleImage";
import SubjectBoxes from "components/book/SubjectBoxes";
import styled from "styled-components";
import BookDesc from "components/common/BookDesc";
import ReviewCreateBox from "components/meeting/ReviewCreateBox";
import Reviews from "components/meeting/Reviews";
import MeetingInfoBox from "components/common/MeetingInfoBox";

interface PropsType {
  userObj: LogInUserInfo;
}

const BookMeeting = ({ userObj }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const [category, setCategory] = useState("book");
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);
  const [meetingReviews, setMeetingReviews] = useState<DocumentType[]>([]);

  useEffect(() => {
    const reviewQ = query(
      collection(dbService, "Meeting_Review"),
      orderBy("createdAt", "desc")
    );
    const reviewUnsub = onSnapshot(reviewQ, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMeetingReviews(newArray as DocumentType[]);
    });
    if (bookInfo.length === 0) {
      const q = query(
        collection(dbService, "Book of the Month"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newArray = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });

        bookSearchHandler(newArray[0].bookTitle, true, setBookInfo);
      });
      return () => {
        unsubscribe();
      };
    }

    return () => {
      reviewUnsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryClick = (name: string) => {
    setCategory(name);
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
          <button
            onClick={() => onCategoryClick("book")}
            className={category === "book" ? "isActive" : null}
          >
            도서 정보
          </button>
          <button
            onClick={() => onCategoryClick("show")}
            className={category === "show" ? "isActive" : null}
          >
            발제문 참여
          </button>
          <button
            onClick={() => onCategoryClick("review")}
            className={category === "review" ? "isActive" : null}
          >
            모임 후기
          </button>
        </BookSection>
        {category === "book" ? <BookDesc bookInfo={bookInfo[0]} /> : null}
        {category === "show" ? <SubjectBoxes /> : null}
        {category === "review" ? (
          <>
            <ReviewCreateBox />
            {meetingReviews.map(({ text, createdAt, creatorId, id }) => (
              <Reviews
                key={id}
                id={id}
                uid={userData?.uid}
                creatorId={creatorId}
                text={text}
                createdAt={createdAt}
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
  button {
    font-size: 11px;
    font-weight: 700;
    width: 32%;
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
