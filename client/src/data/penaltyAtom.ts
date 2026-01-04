import { atom, selector } from 'recoil';

import { isLoadingStatus } from '@/appConstants';

import { LoadableStatus, UserPenalty } from '@/types';

export const penaltyAtom = atom<LoadableStatus<UserPenalty>>({
  key: 'penaltyAtom',
  default: isLoadingStatus,
});

export const userPenaltyAtom = selector({
  key: 'userPenaltyAtom',
  get: ({ get }) => {
    const penaltyDoc = get(penaltyAtom);
    return penaltyDoc;
  },
});
