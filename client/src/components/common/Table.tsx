import { Fragment } from 'react';

import { FiEdit } from 'react-icons/fi';

import {
  MonthlyAbsenceMembers,
  MonthlyFieldAndHost,
  UserAbsence,
} from '@/types';

import TableDataItem, { Label } from '@/components/common/TableDataItem';

type TableRecord = MonthlyFieldAndHost | MonthlyAbsenceMembers | UserAbsence;

type LabelColor = 'yellow' | 'lightBlue';

interface TableProps {
  color?: LabelColor;
  labels: Label[];
  rowDataList: TableRecord[];
  isEditable: boolean;
  onEditClick?: (month: number) => void;
}

export default function Table({
  color = 'lightBlue',
  labels,
  rowDataList,
  isEditable,
  onEditClick,
}: TableProps) {
  const tableStyle = {
    header: {
      lightBlue: 'bg-blue4 text-blue3',
      yellow: 'bg-yellow-50 text-yellow-500',
    },
    border: {
      lightBlue: 'border-[#dcebfc]',
      yellow: 'border-[#fff9b9]',
    },
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-card">
      <table className={`w-full`}>
        <colgroup>
          {labels.includes('월') && <col width="18%" />}
          <col width="40%" />
          <col width="40%" />
          {isEditable && <col width="10%" />}
        </colgroup>

        <thead>
          <tr className={`${tableStyle.header[color]} relative rounded-t-xl`}>
            {labels.map(label => (
              <th key={label} className="py-3 text-[15px] font-medium">
                {label}
              </th>
            ))}
            {isEditable && <th aria-label="수정" />}
          </tr>
        </thead>

        <tbody>
          {rowDataList?.map(record => (
            <Fragment key={record.month}>
              <tr
                className={`border-b ${tableStyle.border[color]} last:border-0`}
              >
                {'month' in record && labels.includes('월') && (
                  <TableDataItem label="월" data={record.month} color={color} />
                )}
                {'field' in record && (
                  <TableDataItem
                    label="독서분야"
                    data={record.field}
                    detail={record.detail}
                  />
                )}
                {'hosts' in record && (
                  <TableDataItem isMulti label="발제자" data={record.hosts} />
                )}
                {'onceAbsenceMembers' in record && (
                  <TableDataItem
                    isMulti
                    label="일회불참멤버"
                    data={record.onceAbsenceMembers}
                  />
                )}
                {'breakMembers' in record && (
                  <TableDataItem
                    isMulti
                    label="모임정지멤버"
                    data={record.breakMembers}
                  />
                )}
                {'onceAbsenceMonth' in record && (
                  <TableDataItem
                    label="일회불참"
                    data={record.onceAbsenceMonth}
                  />
                )}
                {'breakMonth' in record && (
                  <TableDataItem label="모임정지" data={record.breakMonth} />
                )}

                {isEditable && 'month' in record && (
                  <td className="px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onEditClick(record.month)}
                    >
                      <FiEdit className="stroke-gray2" />
                    </button>
                  </td>
                )}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
