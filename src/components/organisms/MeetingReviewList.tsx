import { getFbRoute, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { meetingReviewsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { EmptyBox } from 'routes/BookClubHistory';
import Post from 'components/molecules/post/Post';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import styled from 'styled-components';

interface Props {
  yearMonthId?: string;
}

const MeetingReviewList = ({ yearMonthId = thisYearMonthId }: Props) => {
  const [meetingReviews, setMeetingReviews] =
    useRecoilState(meetingReviewsState);

  const { pathname } = useLocation();

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).MEETING_REVIEWS, setMeetingReviews);
  }, []);

  return (
    <PostBox>
      {meetingReviews?.length !== 0 ? (
        meetingReviews?.map((meetingReview, index) => (
          <Fragment key={meetingReview.id}>
            <Post
              post={meetingReview}
              type='모임 후기'
              collName={getFbRoute(yearMonthId).MEETING_REVIEWS}
            />
            {meetingReviews?.length - 1 !== index && <DottedDividingLine />}
          </Fragment>
        ))
      ) : (
        <EmptyReviewList>
          {pathname.includes('history')
            ? '기록된 모임후기가 없습니다.'
            : '첫번째 모임후기를 남겨보세요.'}
        </EmptyReviewList>
      )}
    </PostBox>
  );
};

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EmptyReviewList = styled(EmptyBox)``;

export default MeetingReviewList;
