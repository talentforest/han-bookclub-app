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
      if (!year) {
        setSelf({ status: 'loaded', data: null });
        return;
      }

      const unsub = getCollection(
        CHALLENGE,
        setSelf,
        where('__name__', '>=', `${year}-`),
      );
      return () => unsub();
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
      if (trigger !== 'get') return;
      if (!uid) {
        setSelf({ status: 'loaded', data: null });
        return;
      }
      const unsub = getCollection(
        CHALLENGE,
        setSelf,
        where('creatorId', '==', uid),
      );

      return () => unsub();
    },
  ],
});
