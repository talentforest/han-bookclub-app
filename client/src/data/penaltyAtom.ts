import { atomFamily } from 'recoil';

import { getDocument } from '@/api';

import { PENALTY, isLoadingStatus } from '@/appConstants';

import { LoadableStatus, Penalty } from '@/types';

export const penaltyAtomFamily = atomFamily<LoadableStatus<Penalty>, string>({
  key: 'penaltyAtomFamily',
  default: isLoadingStatus,
  effects: (year: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      if (!year) return setSelf({ status: 'loaded', data: null });

      getDocument(`BookClub-${year}`, PENALTY, setSelf);
    },
  ],
});
