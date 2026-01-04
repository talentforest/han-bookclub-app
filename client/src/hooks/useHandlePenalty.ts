import { useEffect } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { penaltyAtom } from '@/data/penaltyAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { PENALTY } from '@/appConstants';

import {
  existDocObj,
  getLastDayOfMonth,
  getSubmitSubjectDate,
  thisMonth,
  thisYear,
} from '@/utils';

import { ClubMonth, OverduePenaltyMonths, PenaltyPostType } from '@/types';

export const useHandlePenalty = (createdAt?: number) => {
  const [{ data: penaltyDoc }, setPenaltyDoc] = useRecoilState(penaltyAtom);

  const { uid } = useRecoilValue(currAuthUserAtom);

  useEffect(() => {
    if (!existDocObj(penaltyDoc)) {
      getDocument(PENALTY, thisYear, setPenaltyDoc);
    }
  }, []);

  // 발제문을 기한 내(목요일 자정)에 업로드하지 않을 시 페널티로 모임비(7,000원)이 부과
  const isOverdueSubject = createdAt > getSubmitSubjectDate().getTime();

  // 발제자 - 모임 정리를 기한 내(월말)에 올리지 않을 시 페널티로 다음 책의 추가 발제에 무조건 참여(최소 4개)해야 한다.
  // 불참 멤버 - 월말까지 작성하지 않았을 시 페널티로 모임비 7,000원이 부과된다.
  const isOverdueEndOfThisMonth = createdAt > getLastDayOfMonth().getTime();

  const penaltyPostKeyObj: PenaltyPostType = {
    발제문: 'overdueSubjectMonths',
    '정리 기록': 'overdueHostReviewMonths',
    '불참 후기': 'overdueAbsenceMonths',
  };

  // 페널티 적용 달 업데이트
  const updatePenaltyMonth = async (post: keyof PenaltyPostType) => {
    const prevPenaltyByUser = penaltyDoc[uid] as OverduePenaltyMonths;

    const penaltyType = penaltyPostKeyObj[post];

    const penaltyMonthList = prevPenaltyByUser[penaltyType];

    const hasMonthInList = penaltyMonthList.find(
      month => month === `${+thisMonth}월`,
    );

    if (hasMonthInList) return;

    const updateData = {
      [penaltyType]: [...penaltyMonthList, `${+thisMonth}월`],
    };

    const document = doc(dbService, PENALTY, thisYear);
    await updateDoc(document, {
      [uid]: { ...prevPenaltyByUser, ...updateData },
    });
  };

  const penaltyArrList = Object.keys(penaltyDoc)
    .filter(key => key !== 'id' && key !== 'createdAt')
    .map(key => {
      return { [key]: penaltyDoc[key] };
    }) as { [key: string]: OverduePenaltyMonths }[];

  const penaltySubjectDutyUsers = penaltyArrList.reduce(
    (acc, current) => {
      const key = Object.keys(current)[0];
      const values = current[key].overdueHostReviewMonths;

      if (values.length > 0) {
        if (!acc.overdueHostReviewMonths[key]) {
          acc.overdueHostReviewMonths[key] = [];
        }
        acc.overdueHostReviewMonths[key] =
          acc.overdueHostReviewMonths[key].concat(values);
      }
      return acc;
    },
    { overdueHostReviewMonths: {} as { [key: string]: ClubMonth[] } },
  );

  // 다음달 발제문 의무
  const thisMonthSubjectDuty = {
    overdueHostReviewMonths: Object.entries(
      penaltySubjectDutyUsers.overdueHostReviewMonths,
    ).reduce((acc: { [key: string]: ClubMonth[] }, [key, values]) => {
      if (values.includes(`${+thisMonth - 1}월` as ClubMonth)) {
        acc[key] = values;
      }
      return acc;
    }, {}),
  };

  const thisMonthSubjectDutyUsers = Object.keys(
    thisMonthSubjectDuty.overdueHostReviewMonths,
  );

  const penaltyValueList = Object.values(penaltyDoc).filter(
    value => typeof value === 'object',
  ) as OverduePenaltyMonths[];

  const penaltyCostList = penaltyValueList.reduce(
    (acc, current) => {
      acc.overdueAbsenceMonths = acc.overdueAbsenceMonths.concat(
        current.overdueAbsenceMonths,
      );
      acc.overdueSubjectMonths = acc.overdueSubjectMonths.concat(
        current.overdueSubjectMonths,
      );
      return acc;
    },
    {
      overdueAbsenceMonths: [],
      overdueSubjectMonths: [],
    },
  );

  return {
    isOverdueSubject,
    isOverdueEndOfThisMonth,
    updatePenaltyMonth,
    thisMonthSubjectDutyUsers,
    penaltyCostList,
  };
};
