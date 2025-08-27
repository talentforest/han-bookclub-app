import { v4 } from 'uuid';

import { atom, selector } from 'recoil';

import { UserPenalty } from '@/types';

export const penaltyDocState = atom<UserPenalty>({
  key: `penaltyDoc/${v4()}`,
  default: {} as UserPenalty,
});

export const usersPenaltyList = selector({
  key: `userPenaltyList/${v4()}`,
  get: ({ get }) => {
    const penaltyDoc = get(penaltyDocState);
    const { createdAt, id: docId, ...rest } = penaltyDoc;
    return Object.entries(rest) //
      .map(([key, value]) => ({ [key]: value }));
  },
});
