import {
  finalRecordState,
  recommendsState,
  reviewsState,
  subjectsState,
} from "data/documentsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCollection } from "util/getFirebaseDoc";

const useCallAllRecords = (bookMeetingsId: string) => {
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [recommends, setRecommends] = useRecoilState(recommendsState);
  const [finalRecord, setFinalRecord] = useRecoilState(finalRecordState);

  useEffect(() => {
    getCollection(`BookMeeting Info/${bookMeetingsId}/subjects`, setSubjects);

    getCollection(`BookMeeting Info/${bookMeetingsId}/reviews`, setReviews);

    getCollection(
      `BookMeeting Info/${bookMeetingsId}/recommended book`,
      setRecommends
    );
    getCollection(
      `BookMeeting Info/${bookMeetingsId}/presenter's review`,
      setFinalRecord
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeetingsId]);

  return {
    subjects,
    reviews,
    recommends,
    finalRecord,
  };
};

export default useCallAllRecords;
