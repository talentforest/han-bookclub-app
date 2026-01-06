import { atom, atomFamily } from 'recoil';

import { getCollection } from '@/api';

import { HOST_REVIEW, SUBJECTS, isLoadingStatus } from '@/appConstants';

import { getFbRouteOfPost } from '@/utils';

import { LoadableStatus, UserPost } from '@/types';

export const subjectListAtomFamily = atomFamily<
  LoadableStatus<UserPost[]>,
  string
>({
  key: 'subjectListAtomFamily',
  default: isLoadingStatus,
  effects: (yearMonthId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      getCollection(getFbRouteOfPost(yearMonthId, SUBJECTS), setSelf);
    },
  ],
});

export const hostReviewListAtomFamily = atomFamily<
  LoadableStatus<UserPost[]>,
  string
>({
  key: 'hostReviewListAtomFamily',
  default: isLoadingStatus,
  effects: (yearMonthId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      getCollection(getFbRouteOfPost(yearMonthId, HOST_REVIEW), setSelf);
    },
  ],
});

export const meetingReviewListAtom = atom<LoadableStatus<UserPost[]>>({
  key: 'meetingReviewListAtom',
  default: isLoadingStatus,
});
