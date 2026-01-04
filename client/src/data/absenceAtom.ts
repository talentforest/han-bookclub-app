import { atomFamily, selectorFamily } from 'recoil';

import { userListAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, isLoadingStatus } from '@/appConstants';

import { LoadableStatus, MonthlyAbsenceMembers } from '@/types';

export const absenceAtom = atomFamily<
  LoadableStatus<{ [month: string]: MonthlyAbsenceMembers }>,
  string
>({
  key: 'absenceAtom',
  default: isLoadingStatus,
  effects: (year: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      getDocument(`BookClub-${year}`, ABSENCE_MEMBERS, setSelf);
    },
  ],
});

export const attendanceSelector = selectorFamily({
  key: 'attendanceSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = yearMonthId.slice(0, 4);
      const month = yearMonthId.slice(-2);

      const allMemberList = get(userListAtom);
      const absenceData = get(absenceAtom(year));

      if (!absenceData?.data) {
        return { absenteeList: null, participantList: null };
      }

      const absenceListObj = absenceData?.data;

      const absence = absenceListObj[`${month}월`];

      const absenteeList = [
        ...(absence?.breakMembers || []),
        ...(absence?.onceAbsenceMembers || []),
      ];

      const participantList = allMemberList.data
        .filter(({ membershipJoinTime: time }) => {
          const clubYearMonthId = new Date(+year, +month - 1);
          return new Date(time).getTime() < clubYearMonthId.getTime();
        })
        .filter(member => !absenteeList.includes(member.id))
        .map(member => member.id);

      return { absenteeList, participantList };
    },
});
