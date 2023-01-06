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

export const voteItemState = atom<IVoteItem[]>({
  key: `voteItem${v4()}`,
  default: [],
});
