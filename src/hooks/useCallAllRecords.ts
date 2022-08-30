import {
  recommendsState,
  reviewsState,
  subjectsState,
} from "data/documentsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCollection } from "util/getFirebaseDoc";

const useCallAllRecords = (bookMeetingsId: string) => {
  const [monthSubjects, setMonthSubjects] = useRecoilState(subjectsState);
  const [monthReviews, setMonthReviews] = useRecoilState(reviewsState);
  const [monthRecommends, setMonthRecommends] = useRecoilState(recommendsState);

  useEffect(() => {
    getCollection(
      `BookMeeting Info/${bookMeetingsId}/subjects`,
      setMonthSubjects
    );

    getCollection(
      `BookMeeting Info/${bookMeetingsId}/reviews`,
      setMonthReviews
    );

    getCollection(
      `BookMeeting Info/${bookMeetingsId}/recommended book`,
      setMonthRecommends
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeetingsId]);

  return {
    monthSubjects,
    monthReviews,
    monthRecommends,
  };
};

export default useCallAllRecords;
