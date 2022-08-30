import { useState } from "react";
import { Info } from "components/clubbookhistory/HistoryBox";
import { useLocation } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subjects from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import device from "theme/mediaQueries";
import styled from "styled-components";
import useCallAllRecords from "hooks/useCallAllRecords";

type LocationState = { state: { bookMeeting: IBookMeeting } };

const ClubHistoryDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  const {
    state: { bookMeeting },
  } = useLocation() as LocationState;

  const { id, book, meeting } = bookMeeting;

  const { monthSubjects, monthReviews, monthRecommends } =
    useCallAllRecords(id);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Infos>
        <BookTitleImgBox thumbnail={book.thumbnail} title={book.title} />
        <MeetingInfoBox docData={meeting} />
      </Infos>
      <Categories>
        <button
          className={selectedCategory === "recommends" && "isActive"}
          onClick={() => handleCategoryClick("recommends")}
        >
          추천했던 책
        </button>
        <button
          className={selectedCategory === "subjects" && "isActive"}
          onClick={() => handleCategoryClick("subjects")}
        >
          발제문 기록
        </button>
        <button
          className={selectedCategory === "reviews" && "isActive"}
          onClick={() => handleCategoryClick("reviews")}
        >
          모임 기록
        </button>
      </Categories>
      <Records>
        {selectedCategory === "recommends" &&
          (monthRecommends.length !== 0 ? (
            monthRecommends.map((recommend) => (
              <BookRecomBox
                key={recommend.id}
                recommend={recommend}
                docMonth={id}
              />
            ))
          ) : (
            <EmptyRecord>기록된 추천책이 아직 없어요.</EmptyRecord>
          ))}
        {selectedCategory === "subjects" &&
          (monthSubjects.length !== 0 ? (
            monthSubjects.map((subject) => (
              <Subjects key={subject.id} subject={subject} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
          ))}
        {selectedCategory === "reviews" &&
          (monthReviews.length !== 0 ? (
            monthReviews.map((review) => (
              <Reviews key={review.id} review={review} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
          ))}
      </Records>
    </Container>
  );
};

const Records = styled.div`
  padding: 5px 10px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.text.lightGray};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 100%;
  @media ${device.tablet} {
    > div {
      margin: 0;
      padding: 10px;
      background-color: transparent;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid ${(props) => props.theme.text.gray};
    }
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  margin: 20px 0;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > button {
    cursor: pointer;
    width: 100%;
    padding: 8px;
    font-size: 13px;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    background-color: #eaeaea;
    color: #aaa;
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

const Infos = styled(Info)`
  margin-top: 20px;
  display: flex;
  > div {
    background-color: transparent;
    width: fit-content;
  }
`;

const EmptyRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  font-size: 16px;
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 20vh;
  }
`;

export default ClubHistoryDetail;
