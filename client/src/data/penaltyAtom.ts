import { atom } from 'recoil';
import { v4 } from 'uuid';

export type Months =
  | '1월'
  | '2월'
  | '3월'
  | '4월'
  | '5월'
  | '6월'
  | '7월'
  | '8월'
  | '9월'
  | '10월'
  | '11월'
  | '12월';

interface PenaltyDoc {
  id: string;
  usersPenaltyList: PenaltyItem[];
  createdAt: number;
}

export interface PenaltyItem {
  uid: string;
  passDeadline: {
    subject: Months[];
    hostReview: Months[];
    absence: Months[];
    secondDeadline: Months[];
  };
}

export const penaltyState = atom<PenaltyDoc>({
  key: `penaltyDoc/${v4()}`,
  default: {} as PenaltyDoc,
});
