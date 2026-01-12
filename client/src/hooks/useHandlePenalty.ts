import { dbService } from '@/fbase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { PENALTY } from '@/appConstants';

import {
  getLastDayOfMonth,
  getSubjectDeadline,
  thisMonth,
  thisYearMonthId,
} from '@/utils';

import { PenaltyItem, PenaltyType } from '@/types';

export const useHandlePenalty = () => {
  const { data: currUser } = useRecoilValue(currAuthUserAtom);

  const { data: club } = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const subjectDeadline = getSubjectDeadline(club?.meeting?.time);

  const monthEndDeadline = getLastDayOfMonth();

  const deadlineByType: { [key in PenaltyType]: Date } = {
    LATE_SUBJECT: subjectDeadline,
    LATE_HOST_REVIEW: monthEndDeadline,
    LATE_REVIEW: monthEndDeadline,
  };

  const penaltyCheck = (penaltyType: PenaltyType, postCreatedAt: string) => {
    const deadline = deadlineByType[penaltyType].getTime();
    const postTime = new Date(postCreatedAt).setHours(0, 0, 0, 0);
    const isOverdue = deadline < postTime;

    return { isOverdue: isOverdue };
  };

  const updatePenalty = async ({
    penaltyType,
    postId,
    createdAt,
  }: {
    penaltyType: PenaltyType;
    postId: string;
    createdAt: string;
  }) => {
    const updateData: PenaltyItem = {
      type: penaltyType,
      userId: currUser.uid,
      postId,
      month: +thisMonth,
      createdAt,
    };

    await updateDoc(doc(dbService, 'BookClub-2026', PENALTY), {
      [`${+thisMonth}월.${penaltyType}`]: arrayUnion(updateData),
    });
  };

  return {
    deadlineByType,
    penaltyCheck,
    updatePenalty,
  };
};
