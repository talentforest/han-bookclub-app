import ReviewCreateBox from "components/bookmeeting/ReviewCreateBox";
import Reviews from "components/bookmeeting/Reviews";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";

interface PropsType {
  latestDoc: IBookMeeting;
  monthReviews: IWrittenDocs[];
}

const ReviewArea = ({ latestDoc, monthReviews }: PropsType) => {
  return (
    <>
      <ReviewCreateBox bookInfo={latestDoc?.book} docMonth={latestDoc?.id} />
      {monthReviews?.map((review) => (
        <Reviews
          key={review.id}
          review={review}
          bookInfo={latestDoc?.book}
          docMonth={latestDoc?.id}
        />
      ))}
    </>
  );
};

export default ReviewArea;
