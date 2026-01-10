import { limit } from 'firebase/firestore';

import { atomFamily } from 'recoil';

import {
  getCollection,
  getSubCollectionGroup,
  testerCreatorIdConstraint,
} from '@/api';

import {
  HOST_REVIEW,
  RECOMMENDED_BOOKS,
  SUBJECTS,
  isLoadingStatus,
  loadedStatus,
} from '@/appConstants';

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

      if (!yearMonthId) {
        setSelf({ ...loadedStatus, data: null });
        return;
      }

      getCollection(
        getFbRouteOfPost(yearMonthId, SUBJECTS),
        setSelf,
        ...testerCreatorIdConstraint,
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

      if (!yearMonthId) {
        setSelf({ ...loadedStatus, data: null });
        return;
      }

      getCollection(
        getFbRouteOfPost(yearMonthId, HOST_REVIEW),
        setSelf,
        ...testerCreatorIdConstraint,
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

      if (!collName) {
        setSelf({ ...loadedStatus, data: null });
        return;
      }

      getCollection(collName, setSelf, ...testerCreatorIdConstraint);
    },
  ],
});

export const recommendedBookListAtomFamily = atomFamily<
  LoadableStatus<UserPost[]>,
  string
>({
  key: 'recommendedBookListAtomFamily',
  default: isLoadingStatus,
  effects: (yearMonthId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      if (yearMonthId) {
        const year = yearMonthId.slice(0, 4);

        getCollection(
          `BookClub-${year}/${yearMonthId}/${RECOMMENDED_BOOKS}`,
          setSelf,
          ...testerCreatorIdConstraint,
        );
      } else {
        getSubCollectionGroup(
          RECOMMENDED_BOOKS,
          setSelf,
          ...[...testerCreatorIdConstraint, limit(5)],
        );
      }
    },
  ],
});

export const bestSubjectListAtomFamily = atomFamily<
  LoadableStatus<UserPost[]>,
  string
>({
  key: 'bestSubjectListAtomFamily',
  default: isLoadingStatus,
  effects: (yearMonthId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      if (!yearMonthId) {
        setSelf({ status: 'loaded', data: [] });
      }

      if (yearMonthId) {
        getCollection(
          getFbRouteOfPost(yearMonthId, SUBJECTS),
          setSelf,
          ...testerCreatorIdConstraint,
        );
      }
    },
  ],
});
