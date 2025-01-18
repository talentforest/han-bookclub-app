import { atom } from 'recoil';

import { v4 } from 'uuid';

export interface Absence {
  month: number;
  breakMembers: string[];
  onceAbsenceMembers: string[];
}

export interface AbsenceObj {
  id: string;
  absenceMembers: Absence[];
}

export const absenceListState = atom<AbsenceObj>({
  key: `absenceListState/${v4()}`,
  default: {} as AbsenceObj,
});
