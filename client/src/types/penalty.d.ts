import { penaltyTypeObj } from '@/appConstants';

export type PenaltyType = keyof typeof penaltyTypeObj;
export type PenaltyName = (typeof penaltyTypeObj)[PenaltyType]['name'];

export type PenaltyItem = {
  type: PenaltyType;
  userId: string;
  postId: string;
  month: number;
  createdAt: string;
  basedOnPostId?: string; // SECOND_PENALTY_FEE면 추가
};

export type PenaltyItemByType = { [penaltyKey in PenaltyType]: PenaltyItem[] };

export type Penalty = {
  [monthKey: string]: PenaltyItemByType;
};
