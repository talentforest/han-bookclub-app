import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { penaltyAtomFamily } from '@/data/penaltyAtom';

import { setDocument } from '@/api';

import {
  FEE,
  PENALTY,
  SUBJECT_NUM,
  getInitialDataObjByMonth,
} from '@/appConstants';

import { Penalty, PenaltyItemByType } from '@/types';

import LabelWithValueCard from '@/components/common/LabelWithValueCard';
import EmptyCard from '@/components/common/container/EmptyCard';
import MonthlyPenalty from '@/components/penalty/MonthlyPenalty';

interface PenaltyTableProps {
  year: string;
}

export default function PenaltyInfo({ year }: PenaltyTableProps) {
  const { status, data } = useRecoilValue(penaltyAtomFamily(year));

  const rowDataList: { month: number; items: PenaltyItemByType }[] =
    Object.entries(data || {})
      .map(([key, value]: [string, any]) => ({
        month: +key.slice(0, -1),
        items: value,
      }))
      .sort((a, b) => a.month - b.month);

  const setInitialBookFieldHostInFb = async () => {
    const initialObj = getInitialDataObjByMonth<Penalty>(
      [] as unknown as Penalty,
    );
    setDocument(`BookClub-${year}`, PENALTY, initialObj);
  };

  const totalPenalty = useCallback(
    (type: 'totalFee' | 'totalSubject') => {
      const totalFee =
        rowDataList
          .map(monthlyPenalty => {
            return (
              monthlyPenalty.items.LATE_SUBJECT.length +
              monthlyPenalty.items.LATE_REVIEW.length
            );
          })
          .reduce((acc, curr) => acc + curr, 0) * FEE;

      const totalSubject =
        rowDataList
          .map(monthlyPenalty => {
            return monthlyPenalty.items.LATE_HOST_REVIEW.length;
          })
          .reduce((acc, curr) => acc + curr, 0) * SUBJECT_NUM;

      if (type === 'totalFee') return totalFee;
      if (type === 'totalSubject') return totalSubject;
    },
    [rowDataList.length],
  );

  return (
    status === 'loaded' && (
      <>
        <div className="mb-3 flex flex-col gap-y-2">
          <LabelWithValueCard
            label="모임비총합"
            value={`￦${totalPenalty('totalFee').toLocaleString('ko')}원`}
            editable={false}
            titleClassName="!text-green1 min-w-24"
          />
          <LabelWithValueCard
            label="추가 발제"
            value={`${totalPenalty('totalSubject')}개`}
            editable={false}
            titleClassName="!text-green1 min-w-24 "
          />
        </div>

        {rowDataList.length !== 0 ? (
          <ul className="grid grid-cols-2 gap-3">
            {rowDataList.map(monthlyPenalty => (
              <li key={monthlyPenalty.month}>
                <MonthlyPenalty monthlyPenalty={monthlyPenalty} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCard
            text="아직 월별 독서분야와 발제자 정보가 없습니다."
            createBtnTitle={`${year} 독서분야와 발제자 정보 생성`}
            onCreateClick={setInitialBookFieldHostInFb}
          />
        )}
      </>
    )
  );
}
