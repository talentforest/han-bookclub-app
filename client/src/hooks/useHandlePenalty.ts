import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import {
  getLastDayOfMonth,
  getSubjectDeadline,
  thisYearMonthId,
} from '@/utils';

import { PenaltyType } from '@/types';

export const useHandlePenalty = () => {
  const { data: club } = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const subjectDeadline = getSubjectDeadline(club?.meeting?.time);

  const monthEndDeadline = getLastDayOfMonth();

  const deadlineByType: { [key in PenaltyType]: Date } = {
    LATE_SUBJECT: subjectDeadline,
    LATE_HOST_REVIEW: monthEndDeadline,
    LATE_REVIEW: monthEndDeadline,
  };

  // const addData = async (type: PenaltyType) => {
  //   const fakeData: PenaltyItem = {
  //     type,
  //     userId: '',
  //     postId: '',
  //     month: monthNum,
  //     createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  //   };
  //   await updateDoc(doc(dbService, 'BookClub-2026', PENALTY), {
  //     [`${monthNum}월.${type}`]: arrayUnion(fakeData),
  //   });
  // };

  return {
    deadlineByType,
  };
};
