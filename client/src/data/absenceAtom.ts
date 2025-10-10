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
    (yearMonthId: string) =>
    ({ get }) => {
      const allMemberList = get(allUsersAtom);
      const absenceData = get(absenceAtom);

      const absenceList = absenceData?.absenceMembers || [];
      const year = +yearMonthId.slice(0, 4);
      const month = +yearMonthId.slice(-2);

      const absence = absenceList.find(({ month: mon }) => month === mon);

      const absenteeList = [
        ...(absence?.breakMembers || []),
        ...(absence?.onceAbsenceMembers || []),
      ];

      const participantList = allMemberList
        .filter(({ membershipJoinTime: time }) => {
          const clubYearMonthId = new Date(year, month - 1);
          return new Date(time).getTime() < clubYearMonthId.getTime();
        })
        .filter(member => !absenteeList.includes(member.id))
        .map(member => member.id);

      return { absenteeList, participantList };
    },
});
