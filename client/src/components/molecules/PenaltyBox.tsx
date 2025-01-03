import UserName from 'components/atoms/user/UserName';
import { Month } from 'data/penaltyAtom';
import { ReactNode, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import styled from 'styled-components';

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

  const onInfoClick = () => setIsOpenInfo((prev) => !prev);

  const getNextMonth = (month: string) => {
    return +month.slice(0, -1) === 12
      ? '내년 1'
      : `${+month.slice(0, -1) + 1}${month.slice(-1)}`;
  };

  return (
    <Box>
      <BoxTitle className='title'>{title}</BoxTitle>

      {title.includes('의무 발제 부과') && (
        <>
          {dutySubjectUsers?.length !== 0 ? (
            <List>
              {dutySubjectUsers?.map((userId) => (
                <UserName key={userId} userId={userId} tag />
              ))}
            </List>
          ) : (
            <EmptyData>발제가 부과된 사람이 없어요.</EmptyData>
          )}
        </>
      )}

      {title.includes('의무 발제달') && (
        <>
          {subjectDutyMonths?.length !== 0 ? (
            <List>
              {subjectDutyMonths?.map((month) => (
                <Item key={month}>{getNextMonth(month)}</Item>
              ))}
            </List>
          ) : (
            <EmptyData>정보가 없습니다.</EmptyData>
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
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  border-radius: 15px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 10px;
`;

const BoxTitle = styled.span`
  min-width: 85px;
  font-size: 15px;
  color: ${({ theme }) => theme.text.gray3};
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
`;

const Item = styled.li`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 15px;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.container.lightGray};
`;

const EmptyData = styled.span`
  text-align: end;
`;
