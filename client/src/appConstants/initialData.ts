import { MonthlyAbsenceMembers } from '@/types';

export const initialAbsenseMembersData: {
  absenceMembers: MonthlyAbsenceMembers[];
} = {
  absenceMembers: Array.from({ length: 12 }, (_, index) => {
    return {
      month: index + 1,
      breakMembers: [],
      onceAbsenceMembers: [],
    } as MonthlyAbsenceMembers;
  }),
};
