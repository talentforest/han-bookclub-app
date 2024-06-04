import { getDocument } from 'api/getFbDoc';
import { PostType } from 'components/molecules/PostHandleBtns';
import { PENALTY } from 'constants/index';
import { OverduePenaltyMonths, penaltyDocState } from 'data/penaltyAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  existDocObj,
  getLastDayOfMonth,
  getSubmitSubjectDate,
  thisMonth,
  thisYear,
} from 'util/index';

const useUpdatePenalty = ({ createdAt }: { createdAt: number }) => {
  const [penaltyDoc, setPenaltyDoc] = useRecoilState(penaltyDocState);
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    if (!existDocObj(penaltyDoc)) {
      getDocument(PENALTY, thisYear, setPenaltyDoc);
    }
  }, []);

  const isOverdueSubject = createdAt > getSubmitSubjectDate().getTime();
  const isOverdueEndOfThisMonth = createdAt > getLastDayOfMonth().getTime();

  const updatePenaltyMonth = async (postType: PostType) => {
    const penaltyTypeKeys: { [key: string]: keyof OverduePenaltyMonths } = {
      발제문: 'overdueSubjectMonths',
      '정리 기록': 'overdueHostReviewMonths',
      '불참 후기': 'overdueAbsenceMonths',
    };

    const previousPenalty = penaltyDoc[currentUser.uid] as OverduePenaltyMonths;
    const penaltyType = penaltyTypeKeys[postType];
    const penaltyMonthList = previousPenalty[penaltyType];

    const hasMonthInList = penaltyMonthList.find(
      (month) => month === `${+thisMonth}월`
    );
    if (hasMonthInList) {
      console.log('이미 해당월이 추가되어 있습니다!');
      return;
    }
    const updateData = {
      [penaltyType]: [...penaltyMonthList, `${+thisMonth}월`],
    };

    const document = doc(dbService, PENALTY, thisYear);
    await updateDoc(document, {
      [currentUser.uid]: { ...previousPenalty, ...updateData },
    });
  };

  return {
    isOverdueSubject,
    isOverdueEndOfThisMonth,
    updatePenaltyMonth,
  };
};

export default useUpdatePenalty;
