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
import CategoryButton from "components/common/CategoryButton";

type LocationState = { state: { bookMeeting: IBookMeeting } };

const ClubHistoryDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  const {
    state: { bookMeeting },
  } = useLocation() as LocationState;

  const { id, book, meeting } = bookMeeting;

  const { monthSubjects, monthReviews, monthRecommends } =
    useCallAllRecords(id);

  return (
    <Container>
      <Infos>
        <BookTitleImgBox thumbnail={book.thumbnail} title={book.title} />
        <MeetingInfoBox docData={meeting} />
      </Infos>
      <CategoryButton
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
