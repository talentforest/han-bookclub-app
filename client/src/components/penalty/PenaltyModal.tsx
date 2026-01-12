import { penaltyTypeObj } from '@/appConstants';

import { useHandlePenalty } from '@/hooks';

import { formatDate } from '@/utils';

import { PenaltyItemByType, PenaltyType } from '@/types';

import Modal from '@/components/common/Modal';
import UserImgName from '@/components/common/user/UserImgName';

interface PenaltyModalProps {
  monthNum: number;
  penaltyListByMonth: PenaltyItemByType;
}

export default function PenaltyModal({
  monthNum,
  penaltyListByMonth,
}: PenaltyModalProps) {
  const penaltyListByType = Object.entries(penaltyListByMonth)
    .map(([key, value]) => ({ [key]: value }))
    .sort((a, b) =>
      Object.keys(b)[0].localeCompare(Object.keys(a)[0]),
    ) as PenaltyItemByType[];

  const { deadlineByType } = useHandlePenalty();

  return (
    <Modal title={`${monthNum}월 페널티 정보`}>
      <ul className="grid grid-cols-1 gap-2">
        {penaltyListByType.map(item => {
          const penaltyType = Object.keys(item)[0] as PenaltyType;

          const penaltyList = Object.values(item)[0];

          return (
            <li
              key={penaltyType}
              className="overflow-hidden rounded-2xl border"
            >
              <div className="border-b bg-[#f8f8f8] px-3 pb-1 pt-3">
                <h3 className="text-sm font-medium leading-4 text-black">
                  {penaltyTypeObj[penaltyType].name}
                </h3>

                <span className="text-xs text-pointCoral">
                  <span className="text-gray1">기한 | </span>
                  {formatDate(
                    deadlineByType[penaltyType],
                    'yy.M.d. EEEE a h:mm:ss',
                  )}
                </span>
              </div>

              {penaltyList.length > 0 ? (
                <ul className="flex p-3">
                  {penaltyList.map(item => (
                    <li
                      key={item.userId}
                      className="flex w-full items-end justify-between gap-y-1"
                    >
                      <UserImgName
                        size="sm"
                        isLink={false}
                        userId={item.userId}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="block p-3 text-sm text-gray2">
                  정보가 없습니다.
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
