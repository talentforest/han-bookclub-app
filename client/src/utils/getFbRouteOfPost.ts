import { SubCollection } from 'appConstants';

export const getFbRouteOfPost = (
  yearMonthDocId: string,
  subCollection: Omit<SubCollection, 'VotedItems'>,
) => {
  const year = yearMonthDocId.slice(0, 4);
  const collection = `BookClub-${year}`;
  return `${collection}/${yearMonthDocId}/${subCollection}`;
};
