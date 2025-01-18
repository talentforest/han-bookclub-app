import { IBookVoteItem, IVoteItemsByMember } from 'data/voteAtom';

export const getVoteCountsById = (
  voteItems: IBookVoteItem[],
  votedItemsByMember: IVoteItemsByMember[],
) => {
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
