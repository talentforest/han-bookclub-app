import { IBookClubMonthInfo } from 'data/documentsAtom';

const useGroupedBookByYear = (bookMeetingDocs: IBookClubMonthInfo[]) => {
  const yearKey = bookMeetingDocs?.reduce(
    (acc: any, current: IBookClubMonthInfo) => {
      const bookRegisteredYear = current.id.split('-')[0];

      acc[bookRegisteredYear] = acc[bookRegisteredYear] || [];
      acc[bookRegisteredYear].push(current);

      return acc;
    },
    {}
  );

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
