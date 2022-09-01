import BookRecomBox from "components/bookmeeting/BookRecomBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import { IBookMeeting } from "util/getFirebaseDoc";

interface PropsType {
  thisMonthDoc: IBookMeeting;
  recommends: IWrittenDocs[];
}

const RecommendationArea = ({ thisMonthDoc, recommends }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  return (
    <>
      <BookRecomCreateBox
        uid={userData?.uid}
        thisMonthBook={thisMonthDoc?.book}
        docMonth={thisMonthDoc?.id}
      />
      {recommends.length !== 0 &&
        recommends?.map((recommend) => (
          <BookRecomBox
            key={recommend.id}
            recommend={recommend}
            docMonth={thisMonthDoc?.id}
          />
        ))}
    </>
  );
};

export default RecommendationArea;
