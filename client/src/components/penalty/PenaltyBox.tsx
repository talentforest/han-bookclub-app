import { ReactNode, useState } from 'react';

import UserName from '@/components/common/user/UserName';
import { Month } from '@/data/penaltyAtom';
import { FiInfo } from 'react-icons/fi';

interface Props {
  title:
    | `${string} 의무 발제 부과`
    | '의무 발제달'
    | '누적 페널티비'
    | '총 페널티비';
  dutySubjectUsers?: string[];
  subjectDutyMonths?: Month[];
  totalCost?: number;
  children?: ReactNode;
}

export default function PenaltyBox({
  title,
  dutySubjectUsers,
  subjectDutyMonths,
  totalCost,
  children,
}: Props) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const onInfoClick = () => setIsOpenInfo(prev => !prev);

  const getNextMonth = (month: string) => {
    return +month.slice(0, -1) === 12
      ? '내년 1'
      : `${+month.slice(0, -1) + 1}${month.slice(-1)}`;
  };

  return (
    <div>
      <span className="title">{title}</span>

      {title.includes('의무 발제 부과') && (
        <>
          {dutySubjectUsers?.length !== 0 ? (
            <ul>
              {dutySubjectUsers?.map(userId => (
                <UserName key={userId} userId={userId} tag />
              ))}
            </ul>
          ) : (
            <span>발제가 부과된 사람이 없어요.</span>
          )}
        </>
      )}

      {title.includes('의무 발제달') && (
        <>
          {subjectDutyMonths?.length !== 0 ? (
            <ul>
              {subjectDutyMonths?.map(month => (
                <li key={month}>{getNextMonth(month)}</li>
              ))}
            </ul>
          ) : (
            <span>정보가 없습니다.</span>
          )}
        </>
      )}

      {title.includes('페널티비') && (
        <>
          <span>￦{totalCost.toLocaleString('ko')}</span>
          {totalCost !== 0 && children && (
            <button onClick={onInfoClick}>
              <FiInfo />
            </button>
          )}

          {isOpenInfo && children}
        </>
      )}
    </div>
  );
}
