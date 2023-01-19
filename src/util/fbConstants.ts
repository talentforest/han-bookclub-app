export const USER_DATA = 'User Data';
export const BOOK_FIELD_HOST = 'BookFieldAndHost';
export const VOTE = 'Vote';

export const getFbRoute = (id: string) => {
  const year = id.slice(0, 4);
  return {
    SUBJECTS: `BookClub-${year}/${id}/Subjects`,
    REVIEWS: `BookClub-${year}/${id}/Reviews`,
    RECOMMENDED_BOOKS: `BookClub-${year}/${id}/RecommendedBooks`,
    HOST_REVIEW: `BookClub-${year}/${id}/HostReview`,
    VOTE_ITEMS: `Vote/${id}/Voted Items`,
  };
};
