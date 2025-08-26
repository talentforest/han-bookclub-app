import { BaseBookData } from '@/types/book';

export type BookVote = {
  id: string;
  title: string;
  creatorId: string;
  createdAt: string;
  deadline: string;
  voteItems: BookVoteItem[];
};

export type BookVoteItem = {
  id: number;
  book: Pick<BaseBookData, 'title' | 'thumbnail' | 'url'>;
  selectReason: string;
};

export type BookVoteItemsByMember = {
  votedItem: { id: number; title: string }[];
  createdAt: string;
};
