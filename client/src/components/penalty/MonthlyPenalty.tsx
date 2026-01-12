import { FaChevronRight } from 'react-icons/fa';

import { FEE, SUBJECT_NUM } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { thisMonth } from '@/utils';

import { PenaltyItemByType } from '@/types';

import PenaltyModal from '@/components/penalty/PenaltyModal';

interface MonthlyPenaltyProps {
  monthlyPenalty: {
    month: number;
    items: PenaltyItemByType;
  };
}

export default function MonthlyPenalty({
  monthlyPenalty: { month, items },
}: MonthlyPenaltyProps) {
  const { showModal } = useHandleModal();

  const toggleModal = (month: number, items: PenaltyItemByType) => {
    showModal({
      element: <PenaltyModal monthNum={month} penaltyListByMonth={items} />,
    });
  };

  const totalFee = (items.LATE_REVIEW.length + items.LATE_SUBJECT.length) * FEE;

  const totalAdditionalSubject = items.LATE_HOST_REVIEW.length * SUBJECT_NUM;

  return (
    <button
      type="button"
      onClick={() => toggleModal(month, items)}
      disabled={month > +thisMonth}
      className="flex w-full flex-col rounded-xl bg-white px-3 py-4 shadow-card"
    >
      <div className="flex items-center justify-between">
        <span
          className={`w-fit text-[15px] font-medium ${month > +thisMonth ? 'text-gray2' : 'text-blue2'}`}
        >
          {month}월 모임 정보
        </span>
        <FaChevronRight
          className={`text-xs ${month > +thisMonth ? 'text-gray2' : 'text-blue3'}`}
        />
      </div>

      <div className="mt-3 flex flex-col gap-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray2">모임비</span>
          <span
            className={`text-sm tracking-tighter ${totalFee > 0 ? 'text-blue2' : 'text-gray2'}`}
          >
            ￦{totalFee.toLocaleString('ko')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray2">추가발제</span>
          <span
            className={`text-sm tracking-tighter ${totalAdditionalSubject > 0 ? 'text-blue2' : 'text-gray2'}`}
          >
            {totalAdditionalSubject}
          </span>
        </div>
      </div>
    </button>
  );
}
