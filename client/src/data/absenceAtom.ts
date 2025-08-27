import { v4 } from 'uuid';

import { atom, selectorFamily } from 'recoil';

import { allUsersAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { MonthlyAbsenceMembers } from '@/types';

export const absenceAtom = atom<{
  id: string;
  absenceMembers: MonthlyAbsenceMembers[];
} | null>({
  key: `absence/${v4()}`,
  default: null,
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
