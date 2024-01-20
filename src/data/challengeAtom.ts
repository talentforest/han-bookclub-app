import { atom } from 'recoil';
import { v4 } from 'uuid';
import { IBookApi } from './bookAtom';

export interface IChallenge {
  id?: string;
  createdAt: number;
  creatorId: string;
  books: IBookApi[];
  wholePage: number;
  currentPage: number;
}

export const challengeState = atom<IChallenge[]>({
  key: `challenge/${v4()}`,
  default: null,
});
