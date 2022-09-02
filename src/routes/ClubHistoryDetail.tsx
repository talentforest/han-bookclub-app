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
import { RecordBox } from "components/template/RecommendationArea";

type LocationState = { state: { bookMeeting: IBookMeeting } };

const ClubHistoryDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  const {
    state: { bookMeeting },
  } = useLocation() as LocationState;

  const { id, book, meeting } = bookMeeting;

  const { subjects, reviews, recommends } = useCallAllRecords(id);

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
          className={selectedCategory === "recommends" ? "isActive" : ""}
          onClick={() => handleCategoryClick("recommends")}
        >
          추천했던 책
        </button>
        <button
          className={selectedCategory === "subjects" ? "isActive" : ""}
          onClick={() => handleCategoryClick("subjects")}
        >
          발제문 기록
        </button>
        <button
          className={selectedCategory === "reviews" ? "isActive" : ""}
          onClick={() => handleCategoryClick("reviews")}
        >
          모임 기록
        </button>
      </Categories>
      <RecordBox>
        {selectedCategory === "recommends" &&
          (recommends.length !== 0 ? (
            recommends.map((recommend) => (
              <BookRecomBox
                key={recommend.id}
                recommend={recommend}
                docMonth={id}
              />
            ))
          ) : (
            <EmptyRecord>기록된 추천책이 없어요.</EmptyRecord>
          ))}
        {selectedCategory === "subjects" &&
          (subjects.length !== 0 ? (
            subjects.map((subject) => (
              <Subjects key={subject.id} subject={subject} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 발제문이 없어요.</EmptyRecord>
          ))}
        {selectedCategory === "reviews" &&
          (reviews.length !== 0 ? (
            reviews.map((review) => (
              <Reviews key={review.id} review={review} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 모임후기가 없어요.</EmptyRecord>
          ))}
      </RecordBox>
    </Container>
  );
};

const Categories = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0 10px;
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
    > button {
      padding: 12px 8px;
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
    box-shadow: none;
  }
`;

const EmptyRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  border-radius: 5px;
  background-color: ${(props) => props.theme.text.lightGray};
  padding: 20px 0;
  font-size: 16px;
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 20vh;
  }
`;

export default ClubHistoryDetail;
