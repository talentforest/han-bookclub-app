import { atom } from 'recoil';

import { isLoadingStatus } from '@/appConstants';

import { LoadableStatus, UserPost } from '@/types';

export const subjectListAtom = atom<LoadableStatus<UserPost[]>>({
  key: 'subjectListAtom',
  default: isLoadingStatus,
});

export const hostReviewListAtom = atom<LoadableStatus<UserPost[]>>({
  key: 'hostReviewListAtom',
  default: isLoadingStatus,
});

export const meetingReviewListAtom = atom<LoadableStatus<UserPost[]>>({
  key: 'meetingReviewListAtom',
  default: isLoadingStatus,
});
