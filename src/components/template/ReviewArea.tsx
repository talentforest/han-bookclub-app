import { getFbRoute } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { EmptyBox, Record } from './RecommendArea';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { reviewsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import ReviewCreateBox from 'components/organisms/bookclubthismonth/ReviewCreateBox';
import RecordBox from 'components/organisms/RecordBox';

interface IReviewAreaProps {
  yearMonthId: string;
}

const ReviewArea = ({ yearMonthId }: IReviewAreaProps) => {
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const { pathname } = useLocation();
  const thisMonthPage = pathname.includes('bookclub');

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).REVIEWS, setReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {thisMonthPage && <ReviewCreateBox docMonth={yearMonthId} />}
      <Record $grid>
        {reviews?.length !== 0 ? (
          reviews?.map((review) => (
            <RecordBox
              key={review.id}
              doc={review}
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
      </Record>
    </>
  );
};

export default ReviewArea;
