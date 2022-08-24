import { bookMeetingsState } from "data/documentsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getBookMeetings } from "util/getFirebaseDoc";

const useCallBookMeeting = () => {
  const [bookMeetings, setBookMeetings] = useRecoilState(bookMeetingsState);

  const checkBookMeetingData = () => {
    if (!bookMeetings?.length) {
      getBookMeetings(setBookMeetings);
    } else {
      return;
    }
  };

  useEffect(() => {
    checkBookMeetingData();

    return () => {
      checkBookMeetingData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    bookMeetings,
  };
};

export default useCallBookMeeting;
