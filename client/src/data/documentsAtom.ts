import { v4 } from 'uuid';

import { atom } from 'recoil';

import { UserPost } from '@/types';

export const subjectsState = atom<UserPost[]>({
  key: `subjectDocs/${v4()}`,
  default: null,
});

export const hostReviewState = atom<UserPost[]>({
  key: `hostReviews/${v4()}`,
  default: null,
});

export const meetingReviewsState = atom<UserPost[]>({
  key: `meetingReviewDocs/${v4()}`,
  default: [],
});

export const recommendsState = atom<UserPost[]>({
  key: `recommendDocs/${v4()}`,
  default: [],
});
