import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import { useRecoilState } from "recoil";
import { thisMonthState } from "data/documentsAtom";
import { getDocument } from "util/getFirebaseDoc";
import { thisYearMonth } from "util/constants";
import useCallAllRecords from "hooks/useCallAllRecords";
import Loading from "components/common/Loading";
import Subtitle from "components/common/Subtitle";
import RecommendationArea, {
  EmptyRecord,
} from "components/template/RecommendationArea";
import SubjectArea from "components/template/SubjectArea";
import ReviewArea from "components/template/ReviewArea";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import Guide from "components/common/Guide";
import FinalReviewCreateModal from "components/bookmeeting/FinalReviewCreateModal";
import FinalReview from "components/common/FinalReview";

const BookMeeting = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [selectedCategory, setSelectedCategory] = useState("subjects");
  const { subjects, reviews, recommends, finalRecord } = useCallAllRecords(
    thisMonthDoc?.id
  );

  useEffect(() => {
    getDocument("BookMeeting Info", `${thisYearMonth}`, setThisMonthDoc);
  }, [setThisMonthDoc]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const checkThisMonthDoc = Object.keys(thisMonthDoc).length;

  return (
    <>
      {checkThisMonthDoc === 0 ? (
        <Loading />
      ) : (
        <Container>
          <Subtitle title={`${thisMonthDoc.id?.slice(6)}월의 책`} />
          <MeetingBox>
            <BookTitleImgBox
              thumbnail={thisMonthDoc.book.thumbnail}
              title={thisMonthDoc.book.title}
              detailInfo={thisMonthDoc.book}
            />
            {thisMonthDoc.book.url && (
              <a href={thisMonthDoc.book.url} target="_blank" rel="noreferrer">
                Daum책 상세정보 보러가기
              </a>
            )}
            <MeetingInfoBox docData={thisMonthDoc.meeting} />
          </MeetingBox>
          <Guide text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 작성이 불가능한 점 유의해주세요." />

          <AfterMeetingRecord>
            <Subtitle title="발제자의 모임 정리 기록" />
            {finalRecord?.length !== 0 ? (
              finalRecord?.map((finalReview) => (
                <FinalReview
                  key={finalReview.id}
                  finalReview={finalReview}
                  docMonth={thisMonthDoc.id}
                />
              ))
            ) : (
              <>
                <FinalReviewCreateModal
                  bookInfo={thisMonthDoc?.book}
                  docMonth={thisMonthDoc.id}
                />
                <EmptyRecord>
                  아직 모임 후 정리된 기록물이 없습니다.
                </EmptyRecord>
              </>
            )}
          </AfterMeetingRecord>
          <Categories>
            <button
              className={selectedCategory === "recommends" ? "isActive" : ""}
              onClick={() => handleCategoryClick("recommends")}
            >
              추천책 작성
            </button>
            <button
              className={selectedCategory === "subjects" ? "isActive" : ""}
              onClick={() => handleCategoryClick("subjects")}
            >
              발제문 작성
            </button>
            <button
              className={selectedCategory === "reviews" ? "isActive" : ""}
              onClick={() => handleCategoryClick("reviews")}
            >
              모임후기 작성
            </button>
          </Categories>
          {selectedCategory === "recommends" && (
            <RecommendationArea
              recommends={recommends}
              thisMonthDoc={thisMonthDoc}
            />
          )}
          {selectedCategory === "subjects" && (
            <SubjectArea subjects={subjects} thisMonthDoc={thisMonthDoc} />
          )}
          {selectedCategory === "reviews" && (
            <ReviewArea reviews={reviews} thisMonthDoc={thisMonthDoc} />
          )}
        </Container>
      )}
    </>
  );
};

const AfterMeetingRecord = styled.section`
  margin: 20px 0;
`;

const MeetingBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto 15px;
  > div:first-child {
    margin-bottom: 50px;
  }
  > p {
    font-size: 13px;
    color: ${(props) => props.theme.text.gray};
  }
  a {
    border: 1px solid ${(props) => props.theme.text.lightGray};
    position: absolute;
    bottom: 115px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    color: ${(props) => props.theme.text.accent};
    background-color: ${(props) => props.theme.container.default};
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  margin: 20px 0 10px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
    }
  }
  @media ${device.tablet} {
    border-radius: 30px;
    padding: 8px 10px;
    > button {
      padding: 12px 8px;
      height: 100%;
      font-size: 16px;
    }
  }
`;

export default BookMeeting;
