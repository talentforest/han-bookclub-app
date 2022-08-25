import { Container } from "theme/commonStyle";
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Subjects from "components/bookmeeting/Subjects";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import Subtitle from "components/common/Subtitle";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import device from "theme/mediaQueries";
import styled from "styled-components";
import useCallAllRecords from "hooks/useCallAllRecords";
import useCallBookMeeting from "hooks/useCallBookMeeting";
import Loading from "components/common/Loading";

const BookMeeting = () => {
  const userData = useRecoilValue(currentUserState);

  const { bookMeetings } = useCallBookMeeting();
  const { monthSubjects, monthReviews, monthRecommends } = useCallAllRecords(
    bookMeetings[0]?.id
  );

  const bookUrlMatch = useMatch("/bookmeeting");
  const subjectUrlMatch = useMatch("/bookmeeting/subject");
  const reviewUrlMatch = useMatch("/bookmeeting/review");

  const latestDoc = bookMeetings[0];

  return (
    <>
      {latestDoc ? (
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
            <>
              <BookRecomCreateBox
                uid={userData?.uid}
                thisMonthBook={latestDoc?.book}
                docMonth={latestDoc?.id}
              />
              {monthRecommends.length !== 0 &&
                monthRecommends?.map((item) => (
                  <BookRecomBox
                    key={item.id}
                    item={item}
                    docMonth={latestDoc?.id}
                  />
                ))}
            </>
          )}
          {subjectUrlMatch && (
            <>
              <SubjectCreateModal
                bookInfo={latestDoc?.book}
                docMonth={latestDoc?.id}
              />
              {monthSubjects?.map((subject) => (
                <Subjects
                  key={subject.id}
                  subject={subject}
                  docMonth={latestDoc?.id}
                />
              ))}
            </>
          )}
          {reviewUrlMatch && (
            <>
              <ReviewCreateBox
                bookInfo={latestDoc?.book}
                docMonth={latestDoc?.id}
              />
              {monthReviews?.map((review) => (
                <Reviews
                  key={review.id}
                  review={review}
                  bookInfo={latestDoc?.book}
                  docMonth={latestDoc?.id}
                />
              ))}
            </>
          )}
        </Container>
      ) : (
        <Loading />
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
