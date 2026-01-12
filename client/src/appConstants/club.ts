import { getLastDayOfMonth, getSubjectDeadline } from '@/utils';

export const monthlyClubInfo = {
  fieldAndHost: '월별 독서분야',
  absence: '모임불참',
  challenge: '챌린지',
  yearClosing: '연말결산',
  penalty: '페널티',
} as const;

export const FEE = 7000;
export const SUBJECT_NUM = 4;

export const penaltyTypeObj = {
  LATE_SUBJECT: {
    name: '발제문 지연',
    fee: FEE,
    deadline: getSubjectDeadline,
  },
  LATE_REVIEW: {
    name: '불참후기 지연',
    fee: FEE,
    deadline: getLastDayOfMonth,
  },
  LATE_HOST_REVIEW: {
    name: '정리기록 지연',
    subject: SUBJECT_NUM,
    deadline: getLastDayOfMonth,
  },
} as const;
