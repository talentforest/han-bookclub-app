import { BookVoteItem, BookVoteItemsByMember } from '@/types';

export const getVoteCountsById = (
  voteItems: BookVoteItem[],
  votedItemsByMember: BookVoteItemsByMember[],
) => {
  if (!votedItemsByMember?.length || !voteItems?.length) return [];

  const voteCountById = voteItems?.map(({ id, book: { title } }) => {
    const allVoteItems = votedItemsByMember
      .map(({ votedItem }) => votedItem)
      .flat();

    const voteCount = allVoteItems?.filter(
      votedItem => votedItem?.id === id,
    ).length;

    return { id, voteCount, title };
  });

  return voteCountById;
};
