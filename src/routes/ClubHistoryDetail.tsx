import { useState } from "react";
import { Info } from "components/clubbookhistory/HistoryBox";
import { getMonthNumber } from "util/getMonthNumber";
import { useLocation } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subjects from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BackButtonHeader from "components/header/BackButtonHeader";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import device from "theme/mediaQueries";
import styled from "styled-components";
import useCallAllRecords from "hooks/useCallAllRecords";

type LocationState = { state: { bookMeeting: IBookMeeting } };

const ClubHistoryDetail = () => {
  const {
    state: { bookMeeting },
  } = useLocation() as LocationState;

  const { monthSubjects, monthReviews, monthRecommends } = useCallAllRecords(
    bookMeeting?.id
  );
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  const onButtonClick = (name: string) => {
    if (name) return setSelectedCategory(name);
  };

  const { id, book, meeting } = bookMeeting;

  return (
    <>
      <BackButtonHeader title={`${getMonthNumber(id)}월의 책모임 기록`} />
      <Container>
        <Infos>
          <BookTitleImgBox docData={book} />
          <MeetingInfoBox docData={meeting} />
        </Infos>
        <BookSection>
          <button
            onClick={() => onButtonClick("recommend")}
            className={selectedCategory === "recommend" ? "isActive" : ""}
          >
            추천책 보기
          </button>
          <button
            onClick={() => onButtonClick("subjects")}
            className={selectedCategory === "subjects" ? "isActive" : ""}
          >
            발제문 보기
          </button>
          <button
            onClick={() => onButtonClick("reviews")}
            className={selectedCategory === "reviews" ? "isActive" : ""}
          >
            모임 후기 보기
          </button>
        </BookSection>
        <Documents>
          {selectedCategory === "recommend" &&
            (monthRecommends.length !== 0 ? (
              monthRecommends.map((item) => (
                <BookRecomBox key={item.id} item={item} docMonth={id} />
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
        </Documents>
      </Container>
    </>
  );
};

const Documents = styled.div`
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

const Infos = styled(Info)`
  margin-top: 20px;
  display: flex;
  > div {
    background-color: transparent;
    width: fit-content;
  }
`;

const BookSection = styled.div`
  margin-top: 20px;
  button {
    cursor: pointer;
    padding: 8px;
    font-size: 13px;
    font-weight: 700;
    width: fit-content;
    margin: 0 5px;
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
    button {
      cursor: pointer;
      padding: 10px 14px;
      font-size: 16px;
      margin: 0 8px 15px;
    }
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
