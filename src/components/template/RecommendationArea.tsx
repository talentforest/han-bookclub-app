import BookRecomBox from "components/bookmeeting/BookRecomBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import { IBookMeeting } from "util/getFirebaseDoc";

interface PropsType {
  latestDoc: IBookMeeting;
  monthRecommends: IWrittenDocs[];
}

const RecommendationArea = ({ latestDoc, monthRecommends }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  return (
    <>
      <BookRecomCreateBox
        uid={userData?.uid}
        thisMonthBook={latestDoc?.book}
        docMonth={latestDoc?.id}
      />
      {monthRecommends.length !== 0 &&
        monthRecommends?.map((recommend) => (
          <BookRecomBox
            key={recommend.id}
            recommend={recommend}
            docMonth={latestDoc?.id}
          />
        ))}
    </>
  );
};

export default RecommendationArea;
