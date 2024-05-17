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
  selectReason: string;
  book: {
    title: string;
    thumbnail: string;
    url: string;
  };
}

export interface IVoteCountById {
  id: number;
  voteCount: number;
  title: string;
}

export interface IVoteItemsByMember {
  votedItem: { id: number; title: string }[];
  createdAt: number;
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

export const initialBookVote: IBookVote = {
  id: '',
  voteId: 1,
  title: '',
  creatorId: '',
  createdAt: Date.now(),
  deadline: '',
  voteItems: [],
};

export const initialBookVoteItem: IBookVoteItem = {
  id: 0,
  selectReason: '',
  book: {
    title: '',
    thumbnail: '',
    url: '',
  },
};

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
