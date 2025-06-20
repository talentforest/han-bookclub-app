import { atom, selectorFamily } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';
import { allUsersAtom } from '@/data/userAtom';
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

export const absenceAtom = atom<AbsenceObj>({
  key: `absence/${v4()}`,
  default: {} as AbsenceObj,
  effects: [
    ({ setSelf }) => {
      const fetchData = async () => {
        getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setSelf);
      };
      fetchData();
    },
  ],
});

export const attendanceSelector = selectorFamily({
  key: 'attendanceSelector',
  get:
    (month: number) =>
    ({ get }) => {
      const allMemberList = get(allUsersAtom);
      const absenceData = get(absenceAtom);

      const absenceList = absenceData?.absenceMembers || [];

      const absence = absenceList.find(({ month: mon }) => month === mon);

      const absenteeList = [
        ...(absence?.breakMembers || []),
        ...(absence?.onceAbsenceMembers || []),
      ];

      const participantList = allMemberList
        .filter(member => !absenteeList.includes(member.id))
        .map(member => member.id);

      return { absenteeList, participantList };
    },
});
