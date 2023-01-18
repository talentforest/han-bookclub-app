import { getFbRoute, CLUB_INFO } from 'util/index';
import { getCollection, getDocument, getUserDocs } from 'api/getFbDoc';
import { EmptyBox, RecordBox } from './RecommendArea';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  clubDocsState,
  reviewsState,
  thisMonthState,
} from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import ReviewCreateBox from 'components/organisms/bookclubthismonth/ReviewCreateBox';
import Record from 'components/organisms/RecordBox';
import { currentUserState } from 'data/userAtom';

interface IReviewAreaProps {
  monthId: string;
}

const ReviewArea = ({ monthId }: IReviewAreaProps) => {
  const [bookMeetings, setBookMeetings] = useRecoilState(clubDocsState);
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const { pathname } = useLocation();
  const { id, book } = thisMonthDoc;
  const userData = useRecoilValue(currentUserState);
  const [test, setTest] = useState([]);

  useEffect(() => {
    getUserDocs(getFbRoute(monthId).REVIEW, userData.uid, setTest);
    getDocument(CLUB_INFO, `${monthId}`, setThisMonthDoc);
    getCollection(getFbRoute(monthId).REVIEW, setReviews);
  }, [setThisMonthDoc, setReviews, monthId]);

  return (
    <>
      {pathname.includes('bookclub') && (
        <ReviewCreateBox bookInfo={book} docMonth={id} />
      )}
      <RecordBox>
        {reviews?.length !== 0 ? (
          reviews?.map((review) => (
            <Record
              key={review.id}
              doc={review}
              collectionName={getFbRoute(monthId).REVIEW}
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
    </>
  );
};

export default ReviewArea;
