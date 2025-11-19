import { SubCollectionSegment } from '@/types';

export const getFbRouteOfPost: (
  yearMonthDocId: string,
  subCollection: Exclude<SubCollectionSegment, 'VotedItems'>,
) => `BookClub-${string}/${string}/${SubCollectionSegment}` = (
  yearMonthDocId,
  subCollection,
) => {
  const year = yearMonthDocId.slice(0, 4);
  const collection: `BookClub-${string}` = `BookClub-${year}`;

  return `${collection}/${yearMonthDocId}/${subCollection}`;
};
