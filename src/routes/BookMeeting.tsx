import { useEffect } from "react";
import { Container } from "theme/commonStyle";
import { useRecoilState } from "recoil";
import { thisMonthBookMeetingState } from "data/documentsAtom";
import { getDocument } from "util/getFirebaseDoc";
import { thisYearMonth } from "util/constants";
import { Link, useMatch } from "react-router-dom";
import useCallAllRecords from "hooks/useCallAllRecords";
import Loading from "components/common/Loading";
import Subtitle from "components/common/Subtitle";
import RecommendationArea from "components/template/RecommendationArea";
import SubjectArea from "components/template/SubjectArea";
import ReviewArea from "components/template/ReviewArea";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import Guide from "components/common/Guide";

const BookMeeting = () => {
  const [latestDoc, setLatestDoc] = useRecoilState(thisMonthBookMeetingState);

  const { monthSubjects, monthReviews, monthRecommends } = useCallAllRecords(
    latestDoc?.id
  );

  useEffect(() => {
    getDocument("BookMeeting Info", `${thisYearMonth}`, setLatestDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subjectUrlMatch = useMatch("/bookmeeting/subjects");
  const reviewUrlMatch = useMatch("/bookmeeting/reviews");
  const recomUrlMatch = useMatch("/bookmeeting/recommends");

  const checkLatestDoc = Object.keys(latestDoc).length;

  return (
    <>
      {checkLatestDoc === 0 ? (
        <Loading />
      ) : (
        <Container>
          <Subtitle title={`${latestDoc?.id?.slice(6)}월의 책`} />
          <Guide
            margin={true}
            text="도서 이미지를 클릭하면 상세정보를 볼 수 있어요."
          />
          <MeetingBox>
            <BookTitleImgBox
              thumbnail={latestDoc.book.thumbnail}
              title={latestDoc.book.title}
              detailInfo={latestDoc.book}
            />
            <MeetingInfoBox docData={latestDoc?.meeting} />
          </MeetingBox>
          <Categories>
            <Link to="recommends" className={recomUrlMatch ? "isActive" : ""}>
              추천책 작성
            </Link>
            <Link to="subjects" className={subjectUrlMatch ? "isActive" : ""}>
              발제문 작성
            </Link>
            <Link to="reviews" className={reviewUrlMatch ? "isActive" : ""}>
              모임후기 작성
            </Link>
          </Categories>
          <Guide
            margin={true}
            text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 작성이 불가능한 점 유의해주세요."
          />
          {recomUrlMatch && (
            <RecommendationArea
              monthRecommends={monthRecommends}
              latestDoc={latestDoc}
            />
          )}
          {subjectUrlMatch && (
            <SubjectArea monthSubjects={monthSubjects} latestDoc={latestDoc} />
          )}
          {reviewUrlMatch && (
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

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  margin: 20px 0 10px;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > a {
    cursor: pointer;
    width: 100%;
    padding: 8px;
    font-size: 13px;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    background-color: #eaeaea;
    color: #aaa;
    text-align: center;
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

export default BookMeeting;
