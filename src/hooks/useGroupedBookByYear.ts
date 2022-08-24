import { IBookMeeting } from "util/getFirebaseDoc";

const useGroupedBookByYear = (bookMeetingDocs: IBookMeeting[]) => {
  const yearKey = bookMeetingDocs?.reduce((acc: any, current: IBookMeeting) => {
    const bookRegisteredYear = current.id.split("-")[0];

    acc[bookRegisteredYear] = acc[bookRegisteredYear] || [];
    acc[bookRegisteredYear].push(current);

    return acc;
  }, {});

  const GroupedBookByYear = Object.keys(yearKey).map((key) => {
    return {
      id: key,
      bookMeeting: yearKey[key] || [],
    };
  });

  return {
    GroupedBookByYear,
  };
};

export default useGroupedBookByYear;
