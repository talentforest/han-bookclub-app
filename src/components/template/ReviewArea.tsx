import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";

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
      {reviews?.map((review) => (
        <Reviews
          key={review.id}
          review={review}
          bookInfo={thisMonthDoc?.book}
          docMonth={thisMonthDoc?.id}
        />
      ))}
    </>
  );
};

export default ReviewArea;
