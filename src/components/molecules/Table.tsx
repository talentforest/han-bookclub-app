import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { Absence } from 'data/absenceAtom';
import { Fragment, useEffect, useState } from 'react';
import { thisMonth } from 'util/index';
import { FiChevronDown, FiChevronUp, FiEdit } from 'react-icons/fi';
import { AbsenceMonthByPersonal } from 'components/organisms/AbsenceMonthTable';
import TableDataItem, { Label } from 'components/molecules/TableDataItem';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

type TableRecord = IBookFieldHost | Absence | AbsenceMonthByPersonal;

type LabelColor = 'yellow' | 'blue';

interface Props {
  color?: LabelColor;
  labels: Label[];
  records: TableRecord[];
  onEditClick?: (month: number) => void;
  isEditable: boolean;
  isFoldable: boolean;
}

export default function Table({
  color = 'yellow',
  labels,
  records,
  onEditClick,
  isEditable,
  isFoldable,
}: Props) {
  const [openTable, setOpenTable] = useState(false);

  const toggleTable = () => setOpenTable((prev) => !prev);

  const thisMonthRecord: TableRecord[] = records.filter(
    (doc) => doc.month === +thisMonth
  );

  const showingRecords = openTable ? records : thisMonthRecord;

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/monthlyinfo' || pathname === '/setting/absence') {
      setOpenTable((prev) => !prev);
    }
  }, []);

  return (
    <TableContainer>
      {isFoldable && (
        <button className='folder-icon' type='button' onClick={toggleTable}>
          {openTable ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      )}

      <table>
        <colgroup>
          {labels.includes('월') && <col width='18%' />}
          <col width='40%' />
          <col width='40%' />
          {isEditable && <col width='10%' />}
        </colgroup>

        <thead>
          <TableRow $color={color}>
            {labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
            {isEditable && <th className='edit'> </th>}
          </TableRow>
        </thead>

        <tbody>
          {showingRecords?.map((record, index) => (
            <Fragment key={index}>
              <TableRow
                $color={color}
                $thisMonth={
                  ('month' in record ? record.month : index + 1) === +thisMonth
                }
              >
                {'month' in record && labels.includes('월') && (
                  <TableDataItem label='월' data={record.month} />
                )}
                {'field' in record && (
                  <TableDataItem label='독서분야' data={record.field} />
                )}
                {'hosts' in record && (
                  <TableDataItem isMulti label='발제자' data={record.hosts} />
                )}

                {'onceAbsenceMembers' in record && (
                  <TableDataItem
                    isMulti
                    label='일회불참멤버'
                    data={record.onceAbsenceMembers}
                  />
                )}
                {'breakMembers' in record && (
                  <TableDataItem
                    isMulti
                    label='모임정지멤버'
                    data={record.breakMembers}
                  />
                )}

                {'onceAbsenceMonth' in record && (
                  <TableDataItem
                    label='일회불참'
                    data={record.onceAbsenceMonth}
                  />
                )}
                {'breakMonth' in record && (
                  <TableDataItem label='모임정지' data={record.breakMonth} />
                )}

                {isEditable && 'month' in record && (
                  <td>
                    <button
                      type='button'
                      onClick={() => onEditClick(record.month)}
                    >
                      <FiEdit stroke='#aaa' />
                    </button>
                  </td>
                )}
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  position: relative;
  & .folder-icon {
    position: absolute;
    top: 12px;
    right: 2.5%;
    svg {
      font-size: 18px;
      stroke: ${({ theme }) => theme.text.gray2};
    }
  }
  > table {
    width: 100%;
    table-layout: fixed;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.container.default};
    box-shadow: ${({ theme }) => theme.boxShadow};
    .no_info {
      color: #aaa;
      font-size: 14px;
    }
  }
`;

const TableRow = styled.tr<{
  $color?: LabelColor;
  $thisMonth?: boolean;
}>`
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: 0;
  }
  > th {
    padding: 12px 0;
    font-weight: 500;
    font-size: 15px;
    background-color: ${({ theme }) => theme.container.lightGray};
    font-size: 14px;
    color: ${({ theme, $color }) =>
      $color === 'blue' ? theme.text.blue1 : theme.text.yellow};
    &:first-child {
      border-top-left-radius: 10px;
    }
    &:last-child {
      border-top-right-radius: 10px;
    }
  }
  > td {
    text-align: center;
    padding: 10px 5px;
    font-size: 15px;
    &.month {
      background-color: ${({ theme }) => theme.container.lightGray};
      font-weight: 500;
      font-size: 14px;
      color: ${({ $thisMonth, $color, theme }) =>
        $thisMonth
          ? $color === 'blue'
            ? theme.text.blue1
            : theme.text.yellow
          : theme.text.gray3};
    }
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4px;
    }
    &.absence {
    }
    &.attendance {
    }
  }
`;
