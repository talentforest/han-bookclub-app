import { Month } from 'data/penaltyAtom';
import { Fragment } from 'react';
import styled from 'styled-components';

interface Props {
  overdueSubjectMonths: Month[];
  overdueAbsenceMonths: Month[];
}

export default function PenaltyCostReceipt({
  overdueSubjectMonths,
  overdueAbsenceMonths,
}: Props) {
  const penaltyCostList = [
    {
      title: '❗️발제문 기한 넘김 x ￦7,000',
      penaltyMonths: overdueSubjectMonths,
    },
    {
      title: '❗️불참 후기 기한 넘김 x ￦7,000',
      penaltyMonths: overdueAbsenceMonths,
    },
  ];

  const totalCost =
    (overdueSubjectMonths.length + overdueAbsenceMonths.length) * 7000;

  return (
    <InfoModal>
      {penaltyCostList.map(
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
