import { getFbRoute, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { EmptyBox, RecordBox } from './RecommendedBookList';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { reviewsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import Record from 'components/atoms/post/Record';

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
    <RecordBox $grid>
      {reviews?.length !== 0 ? (
        reviews?.map((review) => (
          <Record
            key={review.id}
            post={review}
            type='모임 후기'
            collName={getFbRoute(yearMonthId).REVIEWS}
          />
        ))
      ) : (
        <EmptyBox>
          {pathname.includes('history')
            ? '기록된 모임후기가 없습니다.'
            : '첫번째 모임후기를 남겨보세요.'}
        </EmptyBox>
      )}
    </RecordBox>
  );
};

export default ClubReviewList;
