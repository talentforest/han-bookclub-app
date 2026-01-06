import { postNameObj } from '@/appConstants';

import { BaseBookData } from '@/types/book';

export type PostPermission = 'see' | 'edit' | 'register' | 'write';

// 아래로 변경
export type PostName = typeof postNameObj;

export type SubPostTypeKey = keyof PostName['subCollection'];
export type SubPostTypeValue = PostName['subCollection'][SubPostTypeKey];

export type PostTypeKey = keyof PostName['collection'] | SubPostTypeKey;
export type PostTypeValue =
  | PostName['collection'][keyof PostName['collection']]
  | SubPostTypeValue;

export type UserPost = {
  docId?: string;
  text: string;
  creatorId: string;
  createdAt: string;
  updatedAt?: string;
  clubBook?: BaseBookData;
  recommendedBook?: BaseBookData;
  like?: {
    counts: number;
    userList?: string[];
  };
  isAnonymous?: boolean;
  yearMonthId?: string;
};

export type PenaltyPostType = {
  발제문: 'overdueSubjectMonths';
  '정리 기록': 'overdueHostReviewMonths';
  '불참 후기': 'overdueAbsenceMonths';
};

export type UserPenalty = {
  id: string;
  createdAt: string;
  [key: string]: OverduePenaltyMonths | string | number;
};

export type OverduePenaltyMonths = {
  overdueSubjectMonths: ClubMonth[];
  overdueHostReviewMonths: ClubMonth[];
  overdueAbsenceMonths: ClubMonth[];
};
