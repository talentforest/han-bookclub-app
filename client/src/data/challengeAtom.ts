import { where } from 'firebase/firestore';

import { atomFamily } from 'recoil';

import { getCollection } from '@/api';

import { CHALLENGE, isLoadingStatus } from '@/appConstants';

import { Challenge, LoadableStatus } from '@/types';

export const challengeAtomFamily = atomFamily<
  LoadableStatus<Challenge[]>,
  string
>({
  key: 'challengeAtomFamily',
  default: isLoadingStatus,
  effects: (year: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      getCollection(CHALLENGE, setSelf, where('__name__', '>=', `${year}-`));
    },
  ],
});

export const challengeListByUserAtomFamily = atomFamily<
  LoadableStatus<Challenge[]>,
  string
>({
  key: 'challengeListByUserAtomFamily',
  default: isLoadingStatus,
  effects: (uid: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get' || !uid) return;
      getCollection(CHALLENGE, setSelf, where('creatorId', '==', uid));
    },
  ],
});
