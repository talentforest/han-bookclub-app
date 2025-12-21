import { v4 } from 'uuid';

import { atomFamily, selectorFamily } from 'recoil';

import { allUsersAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS } from '@/appConstants';

import { MonthlyAbsenceMembers } from '@/types';

export const absenceAtom = atomFamily<
  {
    id: string;
    absenceMembers: MonthlyAbsenceMembers[];
  },
  string | null
>({
  key: `absence/${v4()}`,
  default: null,
  effects: (year: string) => [
    ({ setSelf }) => {
      const fetchData = async () => {
        getDocument(`BookClub-${year}`, ABSENCE_MEMBERS, setSelf);
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
      const year = +yearMonthId.slice(0, 4);
      const month = +yearMonthId.slice(-2);

      const allMemberList = get(allUsersAtom);
      const absenceData = get(absenceAtom(`${year}`));

      if (!absenceData?.absenceMembers) {
        return { absenteeList: null, participantList: null };
      }

      const absenceList = absenceData?.absenceMembers;

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
