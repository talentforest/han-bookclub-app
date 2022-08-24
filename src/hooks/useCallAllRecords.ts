import {
  recommendsState,
  reviewsState,
  subjectsState,
} from "data/documentsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAllRecommends, getReviews, getSubjects } from "util/getFirebaseDoc";

const useCallAllRecords = (bookMeetingsId: string) => {
  const [monthSubjects, setMonthSubjects] = useRecoilState(subjectsState);
  const [monthReviews, setMonthReviews] = useRecoilState(reviewsState);
  const [monthRecommends, setMonthRecommends] = useRecoilState(recommendsState);

  const recordsNotExist =
    monthSubjects?.length === 0 &&
    monthReviews?.length === 0 &&
    monthRecommends?.length === 0;

  const getAllRecords = () => {
    if (!recordsNotExist) {
      return;
    } else {
      getReviews(bookMeetingsId, setMonthReviews);
      getSubjects(bookMeetingsId, setMonthSubjects);
      getAllRecommends(bookMeetingsId, setMonthRecommends);
    }
  };

  useEffect(() => {
    getAllRecords();
    return () => {
      getAllRecords();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeetingsId]);

  return {
    monthSubjects,
    monthReviews,
    monthRecommends,
  };
};

export default useCallAllRecords;
