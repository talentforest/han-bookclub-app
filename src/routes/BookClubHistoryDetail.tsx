import { useEffect, useState } from 'react';
import { Info } from 'components/bookclubhistory/HistoryBox';
import { useLocation } from 'react-router-dom';
import { Container } from 'theme/commonStyle';
import { getCollection, IBookMeeting } from 'util/getFirebaseDoc';
import { RecordBox } from 'components/template/RecommendationArea';
import { meetingTimestamp } from 'util/timestamp';
import { AccessTime, Place } from '@mui/icons-material';
import {
  hostReviewState,
  recommendsState,
  reviewsState,
  subjectsState,
} from 'data/documentsAtom';
import { useRecoilState } from 'recoil';
import Subjects from 'components/common/SubjectBox';
import ReviewBox from 'components/common/ReviewBox';
import BookTitleImgBox from 'components/common/BookTitleImgBox';
import RecommandBox from 'components/common/RecommandBox';
import HostReviewBox from 'components/common/HostReviewBox';
import Subtitle from 'components/common/Subtitle';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import { clubInfoCollection } from 'util/constants';

type LocationState = { state: { bookMeeting: IBookMeeting } };

const BookClubHistoryDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState('subjects');
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [recommends, setRecommends] = useRecoilState(recommendsState);
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);

  const {
    state: { bookMeeting },
  } = useLocation() as LocationState;
  const { id, book, meeting } = bookMeeting;

  useEffect(() => {
    getCollection(clubInfoCollection(id).SUBJECT, setSubjects);
    getCollection(clubInfoCollection(id).REVIEW, setReviews);
    getCollection(clubInfoCollection(id).RECOMMEND, setRecommends);
    getCollection(clubInfoCollection(id).HOST_REVIEW, setHostReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Infos>
        <BookTitleImgBox thumbnail={book.thumbnail} title={book.title} />
        <MeetingInfo>
          <div>
            <AccessTime /> {meetingTimestamp(meeting.time)}
          </div>
          <div>
            <Place /> {meeting.place}
          </div>
        </MeetingInfo>
      </Infos>
      <AfterMeetingRecord>
        <Subtitle title='발제자의 모임 정리' />
        {hostReview?.length !== 0 ? (
          hostReview?.map((review) => (
            <HostReviewBox key={review.id} review={review} yearMonthId={id} />
          ))
        ) : (
          <EmptyRecord>아직 모임 후 정리된 기록이 없습니다.</EmptyRecord>
        )}
      </AfterMeetingRecord>
      <Categories>
        <button
          className={selectedCategory === 'recommends' ? 'isActive' : ''}
          onClick={() => handleCategoryClick('recommends')}
        >
          추천했던 책
        </button>
        <button
          className={selectedCategory === 'subjects' ? 'isActive' : ''}
          onClick={() => handleCategoryClick('subjects')}
        >
          발제문 기록
        </button>
        <button
          className={selectedCategory === 'reviews' ? 'isActive' : ''}
          onClick={() => handleCategoryClick('reviews')}
        >
          모임 기록
        </button>
      </Categories>
      <RecordBox>
        {selectedCategory === 'recommends' &&
          (recommends.length !== 0 ? (
            recommends.map((recommend) => (
              <RecommandBox
                key={recommend.id}
                recommend={recommend}
                docMonth={id}
              />
            ))
          ) : (
            <EmptyRecord>기록된 추천책이 없어요.</EmptyRecord>
          ))}
        {selectedCategory === 'subjects' &&
          (subjects.length !== 0 ? (
            subjects.map((subject) => (
              <Subjects key={subject.id} subject={subject} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 발제문이 없어요.</EmptyRecord>
          ))}
        {selectedCategory === 'reviews' &&
          (reviews.length !== 0 ? (
            reviews.map((review) => (
              <ReviewBox key={review.id} review={review} docMonth={id} />
            ))
          ) : (
            <EmptyRecord>기록된 모임후기가 없어요.</EmptyRecord>
          ))}
      </RecordBox>
    </Container>
  );
};

const AfterMeetingRecord = styled.section`
  margin: 20px 0;
`;

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

const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  > div {
    width: 50vw;
    height: 40px;
    padding: 0 10px;
    border-radius: 20px;
    border: 1px solid ${(props) => props.theme.container.lightBlue};
    background-color: ${(props) => props.theme.container.default};
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      width: 20px;
      height: 20px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
`;

const EmptyRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  border-radius: 5px;
  background-color: ${(props) => props.theme.text.lightGray};
  padding: 20px 0;
  font-size: 16px;
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 20vh;
  }
`;

export default BookClubHistoryDetail;
