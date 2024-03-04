import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { Absence } from 'data/absenceAtom';
import { Fragment, useState } from 'react';
import { thisMonth } from 'util/index';
import { FiChevronDown, FiChevronUp, FiEdit } from 'react-icons/fi';
import { AbsenceMonthByPersonal } from 'components/organisms/AbsenceMonthTable';
import { useLocation } from 'react-router-dom';
import TableDataItem, { Label } from 'components/molecules/TableDataItem';
import styled from 'styled-components';

type TableRecord = IBookFieldHost | Absence | AbsenceMonthByPersonal;

interface Props {
  labels: Label[];
  records: TableRecord[];
  onEditClick?: (month: number) => void;
  isEditable: boolean;
  isFoldable: boolean;
}

export default function Table({
  labels,
  records,
  onEditClick,
  isEditable,
  isFoldable,
}: Props) {
  const [openTable, setOpenTable] = useState(false);

  const toggleTable = () => setOpenTable((prev) => !prev);

  const thisMonthRecord = records.find((doc) => {
    return doc.month === +thisMonth;
  }) as TableRecord | undefined;

  const { pathname } = useLocation();

  const showingRecords =
    pathname === '/setting/absence' || openTable ? records : [thisMonthRecord];

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
          <TableRow>
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
    > thead {
      th {
        padding: 12px 0;
        font-weight: 500;
        font-size: 15px;
        background-color: ${({ theme }) => theme.container.lightGray};
        font-size: 14px;
        color: ${({ theme }) => theme.text.yellow};
        &:first-child {
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
        }
      }
    }
    .no_info {
      color: #aaa;
      font-size: 14px;
    }
  }
`;

const TableRow = styled.tr<{ $thisMonth?: boolean }>`
  border-bottom: 1px solid #e7e7e7;
  &:last-child {
    border-bottom: 0;
  }
  > td {
    text-align: center;
    padding: 10px 5px;
    font-size: 15px;

    &.month {
      background-color: ${({ theme }) => theme.container.lightGray};
      font-weight: 500;
      font-size: 14px;
      color: ${({ $thisMonth, theme }) =>
        $thisMonth ? theme.text.yellow : theme.text.gray3};
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
