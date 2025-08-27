import { thisYear } from '@/utils';

import { MonthlyAbsenceMembers, MonthlyFieldAndHost } from '@/types';

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

export const initialBookFieldAndHostData: {
  id: string;
  info: MonthlyFieldAndHost[];
} = {
  id: thisYear,
  info: Array.from({ length: 12 }, (_, index) => {
    return {
      month: index + 1,
      hosts: [],
      field: '',
      detail: '',
    } as MonthlyFieldAndHost;
  }),
};
