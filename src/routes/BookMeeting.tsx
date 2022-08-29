import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import { getThisMonthBookMeeting } from "util/getFirebaseDoc";
import { useRecoilState } from "recoil";
import { thisMonthBookMeetingState } from "data/documentsAtom";
import { thisYearMonth } from "util/constants";
import useCallAllRecords from "hooks/useCallAllRecords";
import Loading from "components/common/Loading";
import Subtitle from "components/common/Subtitle";
import RecommendationArea from "components/template/RecommendationArea";
import SubjectArea from "components/template/SubjectArea";
import ReviewArea from "components/template/ReviewArea";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import CategoryButton from "components/common/CategoryButton";
import styled from "styled-components";

const BookMeeting = () => {
  const [latestDoc, setLatestDoc] = useRecoilState(thisMonthBookMeetingState);
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  const { monthSubjects, monthReviews, monthRecommends } = useCallAllRecords(
    latestDoc?.id
  );

  useEffect(() => {
    getThisMonthBookMeeting(setLatestDoc, thisYearMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkObjKeys = Object.keys(latestDoc).length;

  return (
    <>
      {checkObjKeys === 0 ? (
        <Loading />
      ) : (
        <Container>
          <Subtitle title={`${latestDoc.id.slice(6)}월의 책`} />
          <MeetingBox>
            <BookTitleImgBox
              thumbnail={latestDoc.book.thumbnail}
              title={latestDoc.book.title}
              detailInfo={latestDoc.book}
            />
            <p>도서 이미지를 클릭하시면 상세정보를 보실 수 있습니다.</p>
            <MeetingInfoBox docData={latestDoc?.meeting} />
          </MeetingBox>
          <CategoryButton
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {selectedCategory === "recommends" && (
            <RecommendationArea
              monthRecommends={monthRecommends}
              latestDoc={latestDoc}
            />
          )}
          {selectedCategory === "subjects" && (
            <SubjectArea monthSubjects={monthSubjects} latestDoc={latestDoc} />
          )}
          {selectedCategory === "reviews" && (
            <ReviewArea monthReviews={monthReviews} latestDoc={latestDoc} />
          )}
        </Container>
      )}
    </>
  );
};

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
  > p {
    font-size: 13px;
    color: ${(props) => props.theme.text.gray};
  }
`;

export default BookMeeting;
