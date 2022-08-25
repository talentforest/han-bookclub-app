import { Container } from "theme/commonStyle";
import { Link, useMatch } from "react-router-dom";
import useCallAllRecords from "hooks/useCallAllRecords";
import useCallBookMeeting from "hooks/useCallBookMeeting";
import Loading from "components/common/Loading";
import Subtitle from "components/common/Subtitle";
import RecommendationArea from "components/template/RecommendationArea";
import SubjectArea from "components/template/SubjectArea";
import ReviewArea from "components/template/ReviewArea";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import device from "theme/mediaQueries";
import styled from "styled-components";

const BookMeeting = () => {
  const { bookMeetings } = useCallBookMeeting();
  const latestDoc = bookMeetings[0];
  const { monthSubjects, monthReviews, monthRecommends } = useCallAllRecords(
    latestDoc?.id
  );

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  return (
    <>
      {!latestDoc ? (
        <Loading />
      ) : (
        <Container>
          <Subtitle title={`${latestDoc?.id.slice(6)}월의 책`} />
          <MeetingBox>
            <BookTitleImgBox
              thumbnail={latestDoc?.book.thumbnail}
              title={latestDoc?.book.title}
              detailInfo={latestDoc?.book}
            />
            <p>도서 이미지를 클릭하시면 상세정보를 보실 수 있습니다.</p>
            <MeetingInfoBox docData={latestDoc?.meeting} />
          </MeetingBox>
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

const CategoryButton = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  margin: 25px 0 20px;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    height: 36px;
    border-radius: 80px;
    font-size: 14px;
    font-weight: 700;
    color: #aaa;
    cursor: pointer;
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
