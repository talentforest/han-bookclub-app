import { SubCollection } from '@/types';

export const getFbRouteOfPost = (
  yearMonthDocId: string,
  subCollection: Omit<SubCollection, 'VotedItems'>,
) => {
  const year = yearMonthDocId.slice(0, 4);
  const collection = `BookClub-${year}`;
  return `${collection}/${yearMonthDocId}/${subCollection}`;
};

export const getFbRoute = (coll: string, docId?: string) => {
  if (docId) return `${coll}/${docId}`;
  return `${coll}`;
};
