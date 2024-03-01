import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { Absence } from 'data/absenceAtom';
import { Fragment } from 'react';
import { thisMonth } from 'util/index';
import { FiEdit } from 'react-icons/fi';
import { AbsenceMonthByPersonal } from 'components/organisms/AbsenceMonthTable';
import TableDataItem, { Label } from 'components/molecules/TableDataItem';
import styled from 'styled-components';

interface Props {
  labels: Label[];
  records: IBookFieldHost[] | Absence[] | AbsenceMonthByPersonal[];
  onEditClick?: (month: number) => void;
  isFoldable: boolean;
}

export default function Table({
  labels,
  records,
  onEditClick,
  isFoldable,
}: Props) {
  const labelContents = labels.filter((label) => label !== '수정');

  return (
    <TableContainer $isFoldable={isFoldable}>
      <colgroup>
        {labels.includes('월') && <col width='10%' />}
        <col width='45%' />
        <col width='45%' />
      </colgroup>

      <thead>
        <TableRow>
          {labelContents.map((label) => (
            <th key={label} className={label === '월' ? 'month' : 'label'}>
              {label}
            </th>
          ))}
          {labels.includes('수정') && <th className='edit'> </th>}
        </TableRow>
      </thead>

      <tbody>
        {records?.map((record, index) => (
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
                  label='일회불참달'
                  data={record.onceAbsenceMonth}
                />
              )}
              {'breakMonth' in record && (
                <TableDataItem label='모임정지달' data={record.breakMonth} />
              )}

              {'month' in record && labels.includes('수정') && (
                <td className='edit'>
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
    </TableContainer>
  );
}

const TableContainer = styled.table<{ $isFoldable: boolean }>`
  table-layout: fixed;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: ${({ $isFoldable }) =>
    $isFoldable ? '0px' : '10px'};
  border-bottom-right-radius: ${({ $isFoldable }) =>
    $isFoldable ? '0px' : '10px'};
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  > thead {
    th {
      background-color: ${({ theme }) => theme.container.gray};
      padding: 12px 0;
      font-size: 15px;
      color: ${({ theme }) => theme.text.gray3};
      &:first-child {
        border-top-left-radius: 10px;
      }
      &:last-child {
        border-top-right-radius: 10px;
      }
    }
  }
  .edit {
    width: 10%;
    min-width: 50px;
  }
  .no_info {
    color: #aaa;
    font-size: 14px;
  }
  .month {
    text-align: center;
    width: 20%;
    min-width: 50px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;

const TableRow = styled.tr<{ $thisMonth?: boolean }>`
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: 0;
  }
  > td {
    min-width: 50px;
    text-align: center;
    padding: 10px 5px;
    font-size: 15px;
    &.month {
      color: ${({ $thisMonth, theme }) =>
        $thisMonth ? theme.text.blue3 : theme.text.gray3};
    }
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4px;
    }
    &.absence {
      font-size: 15px;
      color: ${({ theme }) => theme.container.gray};
    }
  }
`;
