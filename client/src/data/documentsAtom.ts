import { where } from 'firebase/firestore';

import { atomFamily } from 'recoil';

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

      const constraints =
        process.env.NODE_ENV === 'development'
          ? []
          : [where('creatorId', '!=', 'iFvsDP6KI9PjsvKSNw3qvmwTcxk2')];

      getCollection(
        getFbRouteOfPost(yearMonthId, SUBJECTS),
        setSelf,
        ...constraints,
      );
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

      const constraints =
        process.env.NODE_ENV === 'development'
          ? []
          : [where('creatorId', '!=', 'iFvsDP6KI9PjsvKSNw3qvmwTcxk2')];

      getCollection(
        getFbRouteOfPost(yearMonthId, HOST_REVIEW),
        setSelf,
        ...constraints,
      );
    },
  ],
});

export const meetingReviewListAtomFamily = atomFamily<
  LoadableStatus<UserPost[]>,
  string
>({
  key: 'meetingReviewListAtomFamily',
  default: isLoadingStatus,
  effects: (collName: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      const constraints =
        process.env.NODE_ENV === 'development'
          ? []
          : [where('creatorId', '!=', 'iFvsDP6KI9PjsvKSNw3qvmwTcxk2')];

      getCollection(collName, setSelf, ...constraints);
    },
  ],
});
