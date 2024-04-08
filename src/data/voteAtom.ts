import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IVoteItem {
  id: number;
  item: string;
  voteCount: number;
  selectReason: string;
}

export interface IVote {
  vote: {
    title: string;
    voteItem: IVoteItem[];
  };
  createdAt: number;
  creatorId: string;
  deadline: string;
  id: string;
  voteId: number;
}

export interface IBookVoteItem {
  id: number;
  book: {
    title: string;
    thumbnail: string;
    url: string;
  };
  voteCount: number;
  selectReason: string;
}

export interface IBookVote {
  id?: string;
  voteId: number;
  title: string;
  creatorId: string;
  createdAt: number;
  deadline: string;
  voteItems: IBookVoteItem[];
}

export const bookVotesState = atom<IBookVote[]>({
  key: `bookVoteDocs/${v4()}`,
  default: null,
});

export const votesState = atom<IVote[]>({
  key: `voteDocs/${v4()}`,
  default: null,
});

export const voteItemState = atom<IVoteItem[]>({
  key: `voteItem${v4()}`,
  default: [],
});
