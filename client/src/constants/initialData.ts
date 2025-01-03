import { thisYear } from 'util/index';

interface AbsenceMembersData {
  absenceMembers: AbsenceMembersMyMonth[];
}

interface AbsenceMembersMyMonth {
  month: number;
  breakMembers: string[];
  onceAbsenceMembers: string[];
}

export const initialAbsenseMembersData: AbsenceMembersData = {
  absenceMembers: Array.from({ length: 12 }, (_, index) => {
    return {
      month: index + 1,
      breakMembers: [],
      onceAbsenceMembers: [],
    } as AbsenceMembersMyMonth;
  }),
};

interface BookFieldAndHostData {
  id: string;
  info: BookFieldAndHostMyMonth[];
}

interface BookFieldAndHostMyMonth {
  month: number;
  hosts: string;
  field: string;
  detail: string;
}

export const initialBookFieldAndHostData: BookFieldAndHostData = {
  id: thisYear,
  info: Array.from({ length: 12 }, (_, index) => {
    return {
      month: index + 1,
      hosts: '',
      field: '',
      detail: '',
    } as BookFieldAndHostMyMonth;
  }),
};
