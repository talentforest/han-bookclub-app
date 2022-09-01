import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";
import { EmptyRecord, RecordBox } from "./RecommendationArea";

interface PropsType {
  thisMonthDoc: IBookMeeting;
  reviews: IWrittenDocs[];
}

const ReviewArea = ({ thisMonthDoc, reviews }: PropsType) => {
  return (
    <>
      <ReviewCreateBox
        bookInfo={thisMonthDoc?.book}
        docMonth={thisMonthDoc?.id}
      />
      <RecordBox>
        {reviews?.length !== 0 ? (
          reviews?.map((review) => (
            <Reviews
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
