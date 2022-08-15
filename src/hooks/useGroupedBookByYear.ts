import { IBookMeeting } from "util/getFirebaseDoc";

interface PropsType {
  bookMeetingDocs: IBookMeeting[];
}

const useGroupedBookByYear = ({ bookMeetingDocs }: PropsType) => {
  const yearKey = bookMeetingDocs?.reduce((acc: any, current: IBookMeeting) => {
    const bookRegisteredYear = current.id.split("-")[0];

    acc[bookRegisteredYear] = acc[bookRegisteredYear] || [];
    acc[bookRegisteredYear].push(current);

    return acc;
  }, {});

  const GroupedBookByYear = Object.keys(yearKey).map((key) => {
    return {
      id: key,
      bookMeetingInfo: yearKey[key] || [],
    };
  });

  return {
    GroupedBookByYear,
  };
};

export default useGroupedBookByYear;
