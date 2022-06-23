import { useEffect, useState } from "react";
import { getAllRecommends, getReviews, getSubjects } from "util/getFirebaseDoc";
import { IBookMeetingInfo, Info } from "components/clubbookhistory/HistoryBox";
import { useLocation } from "react-router-dom";
import { Container } from "theme/commonStyle";
import styled from "styled-components";
import Subjects from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import device from "theme/mediaQueries";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BackButtonHeader from "components/common/BackButtonHeader";
import { getMonthNumber } from "util/getMonthNumber";
import BookRecomBox from "components/bookmeeting/BookRecomBox";

type LocationState = { item: IBookMeetingInfo };

const ClubHistoryDetail = () => {
  const location = useLocation();
  const { item } = location.state as LocationState;

  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("subjects");
  const docMonth = item.id;

  useEffect(() => {
    getSubjects(item.id, setSubjects);
    getReviews(item.id, setReviews);
    getAllRecommends(item.id, setRecommends);
    return () => {
      getSubjects(item.id, setSubjects);
      getReviews(item.id, setReviews);
      getAllRecommends(item.id, setRecommends);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onButtonClick = (name: string) => {
    if (name === "subjects") return setSelectedCategory("subjects");
    if (name === "reviews") return setSelectedCategory("reviews");
    if (name === "recommend") return setSelectedCategory("recommend");
  };
  return (
    <>
      <BackButtonHeader title={`${getMonthNumber(item.id)}월의 책모임 기록`} />
      <Container>
        <Infos>
          <BookTitleImgBox docData={item?.book} />
          <MeetingInfoBox docData={item?.meeting} />
        </Infos>
        <BookSection>
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
          <button
            onClick={() => onButtonClick("recommend")}
            className={selectedCategory === "recommend" ? "isActive" : ""}
          >
            추천책 보기
          </button>
        </BookSection>
        <Documents>
          {selectedCategory === "subjects" &&
            (subjects.length !== 0 ? (
              subjects.map((item) => (
                <Subjects key={item.id} item={item} docMonth={docMonth} />
              ))
            ) : (
              <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
            ))}
          {selectedCategory === "reviews" &&
            (reviews.length !== 0 ? (
              reviews.map((item) => (
                <Reviews key={item.id} item={item} docMonth={docMonth} />
              ))
            ) : (
              <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
            ))}

          {selectedCategory === "recommend" &&
            (recommends.length !== 0 ? (
              recommends.map((item) => (
                <BookRecomBox key={item.id} item={item} />
              ))
            ) : (
              <EmptyRecord>기록된 추천책이 아직 없어요.</EmptyRecord>
            ))}
        </Documents>
      </Container>
    </>
  );
};

const Documents = styled.div`
  order: 1;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 100%;
  @media ${device.tablet} {
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
    padding: 5px 8px;
    font-size: 12px;
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
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 13px;
  background-color: ${(props) => props.theme.container.lightBlue};
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 20vh;
  }
`;

export default ClubHistoryDetail;
