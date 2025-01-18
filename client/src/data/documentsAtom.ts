import { atom } from 'recoil';

import { IRecommendedBook } from './bookAtom';
import { v4 } from 'uuid';

export interface IDocument {
  id?: string;
  text: string;
  creatorId: string;
  createdAt: number;
  title: string;
  thumbnail: string;
  recommendedBook?: IRecommendedBook;
  likes?: number;
  likeUsers?: string[];
}

export const subjectsState = atom<IDocument[]>({
  key: `subjectDocs/${v4()}`,
  default: null,
});

export const hostReviewState = atom<IDocument[]>({
  key: `hostReview/${v4()}`,
  default: null,
});

export const meetingReviewsState = atom<IDocument[]>({
  key: `meetingReviewDocs/${v4()}`,
  default: [],
});

export const recommendsState = atom<IDocument[]>({
  key: `recommendDocs/${v4()}`,
  default: [],
});
