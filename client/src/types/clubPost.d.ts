import { postTypeObj } from '@/appConstants';

import { BaseBookData } from '@/types/book';

export type PostPermission = 'see' | 'edit' | 'register' | 'write';

export type PostType = typeof postTypeObj;
export type PostTypeKey = keyof PostType;
export type PostTypeName = PostType[keyof PostType]['name'];
export type PostTypeCollName = PostType[keyof PostType]['collName'];

export type UserPost = {
  id?: string;
  text: string;
  creatorId: string;
  createdAt: string;
  title: string;
  thumbnail: string;
  recommendedBook?: BaseBookData;
  likes?: number;
  likeUsers?: string[];
  isAnonymous?: boolean;
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
