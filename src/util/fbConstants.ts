export const USER_DATA = 'User Data';
export const BOOK_FIELD = 'Book Field';
export const CLUB_INFO = 'BookMeeting Info';
export const VOTE = 'Vote';

export const getFbRoute = (id: string) => {
  return {
    SUBJECT: `BookMeeting Info/${id}/subjects`,
    REVIEW: `BookMeeting Info/${id}/reviews`,
    RECOMMEND: `BookMeeting Info/${id}/recommended book`,
    HOST_REVIEW: `BookMeeting Info/${id}/host review`,
    VOTE_ITEMS: `Vote/${id}/Voted Items`,
  };
};
