import { getFbRoute, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { reviewsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { EmptyBox } from 'routes/BookClubHistory';
import Post from 'components/molecules/Post';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import styled from 'styled-components';

interface Props {
  yearMonthId?: string;
}

const ClubReviewList = ({ yearMonthId = thisYearMonthId }: Props) => {
  const [reviews, setReviews] = useRecoilState(reviewsState);

  const { pathname } = useLocation();

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).REVIEWS, setReviews);
  }, []);

  return (
    <PostBox>
      {reviews?.length !== 0 ? (
        reviews?.map((review, index) => (
          <Fragment key={review.id}>
            <Post
              post={review}
              type='모임 후기'
              collName={getFbRoute(yearMonthId).REVIEWS}
            />
            {reviews?.length - 1 !== index && <DottedDividingLine />}
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

export default ClubReviewList;
