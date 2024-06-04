import { atom, selector } from 'recoil';
import { v4 } from 'uuid';

export type Month =
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
  createdAt: number;
  [key: string]: OverduePenaltyMonths | string | number;
}

export interface OverduePenaltyMonths {
  overdueSubjectMonths: Month[];
  overdueHostReviewMonths: Month[];
  overdueAbsenceMonths: Month[];
}

export const penaltyDocState = atom<PenaltyDoc>({
  key: `penaltyDoc/${v4()}`,
  default: {} as PenaltyDoc,
});

export const usersPenaltyList = selector({
  key: `userPenaltyList/${v4()}`,
  get: ({ get }) => {
    const penaltyDoc = get(penaltyDocState);
    const { createdAt, id: docId, ...rest } = penaltyDoc;
    return Object.entries(rest) //
      .map(([key, value]) => ({ [key]: value }));
  },
});
