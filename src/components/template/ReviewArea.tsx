import { getCollection, getDocument } from "util/getFirebaseDoc";
import { EmptyRecord, RecordBox } from "./RecommendationArea";
import { useEffect } from "react";
import { thisYearMonth } from "util/constants";
import { useRecoilState } from "recoil";
import { reviewsState, thisMonthState } from "data/documentsAtom";
import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import ReviewBox from "components/common/ReviewBox";

const ReviewArea = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [reviews, setReviews] = useRecoilState(reviewsState);

  useEffect(() => {
    getDocument("BookMeeting Info", `${thisYearMonth}`, setThisMonthDoc);
    getCollection(`BookMeeting Info/${thisYearMonth}/reviews`, setReviews);
  }, [setThisMonthDoc, setReviews]);

  return (
    <>
      <ReviewCreateBox
        bookInfo={thisMonthDoc?.book}
        docMonth={thisMonthDoc?.id}
      />
      <RecordBox>
        {reviews?.length !== 0 ? (
          reviews?.map((review) => (
            <ReviewBox
              key={review.id}
              review={review}
              bookInfo={thisMonthDoc?.book}
              docMonth={thisMonthDoc?.id}
            />
          ))
        ) : (
          <EmptyRecord>첫번째 모임후기를 남겨보세요.</EmptyRecord>
        )}
      </RecordBox>
    </>
  );
};

export default ReviewArea;
