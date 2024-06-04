import { OverduePenaltyMonths } from 'data/penaltyAtom';
import { Fragment, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import styled from 'styled-components';

interface Props {
  title: string;
  myPenalty: OverduePenaltyMonths;
}

export default function PenaltyBox({ title, myPenalty }: Props) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const onInfoClick = () => setIsOpenInfo((prev) => !prev);

  const {
    overdueAbsenceMonths,
    overdueHostReviewMonths,
    overdueSubjectMonths,
  } = myPenalty;

  const getNextMonth = (month: string) => {
    return +month.slice(0, -1) === 12
      ? '내년 1'
      : `${+month.slice(0, -1) + 1}${month.slice(-1)}`;
  };

  const totalCost = (
    (overdueSubjectMonths.length + overdueAbsenceMonths.length) *
    7000
  ).toLocaleString('ko-KO');

  const costCauseList = [
    {
      title: '❗️발제문 기한 넘김 x ￦7,000',
      penaltyMonths: overdueSubjectMonths,
    },
    {
      title: '❗️불참 후기 기한 넘김 x ￦7,000',
      penaltyMonths: overdueAbsenceMonths,
    },
  ];

  return (
    <Box>
      <span>{title}</span>

      <div>
        {title === '의무 발제달' ? (
          <MonthList>
            {overdueHostReviewMonths.length !== 0 ? (
              overdueHostReviewMonths.map((month) => (
                <li key={month}>{getNextMonth(month)}</li>
              ))
            ) : (
              <span>정보가 없습니다.</span>
            )}
          </MonthList>
        ) : (
          <>
            <span>￦{totalCost}</span>
            {totalCost !== '0' && (
              <button onClick={onInfoClick}>
                <FiInfo />
              </button>
            )}
          </>
        )}

        {isOpenInfo && (
          <InfoModal>
            {costCauseList.map(
              ({ title, penaltyMonths }) =>
                penaltyMonths.length !== 0 && (
                  <Fragment key={title}>
                    <span>{title}</span>
                    <ul>
                      {penaltyMonths.map((month) => (
                        <li key={month}>{month}</li>
                      ))}
                    </ul>
                  </Fragment>
                )
            )}
            <div>
              <span>합계:</span>
              <span>￦{totalCost}</span>
            </div>
          </InfoModal>
        )}
      </div>
    </Box>
  );
}

const InfoModal = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.default};
  border-radius: 12px;
  position: absolute;
  right: 0;
  top: 52px;
  padding: 10px 8px 5px;
  z-index: 1;
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.text.gray4};
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 2px 0 8px 4px;
    li {
      background-color: ${({ theme }) => theme.container.purple1};
      color: ${({ theme }) => theme.text.purple};
      border-radius: 15px;
      padding: 4px 8px;
      font-size: 13px;
    }
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    border-top: 2px dotted ${({ theme }) => theme.text.gray1};
    padding-top: 8px;
  }
`;

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
  > span {
    font-size: 15px;
    color: ${({ theme }) => theme.text.gray3};
  }
  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    > button {
      padding-top: 4px;
      svg {
        font-size: 16px;
        stroke: ${({ theme }) => theme.text.gray3};
      }
    }
  }
`;

const MonthList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  li {
    padding: 5px 8px;
    border-radius: 10px;
    font-size: 15px;
    color: ${({ theme }) => theme.text.gray4};
    background-color: ${({ theme }) => theme.container.yellow1};
  }
`;
