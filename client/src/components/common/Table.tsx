import { Fragment, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { Absence } from 'data/absenceAtom';
import { IFieldAndHost } from 'data/fieldAndHostAtom';

import { FiChevronDown, FiChevronUp, FiEdit } from 'react-icons/fi';
import { thisMonth } from 'utils';

import { AbsenceMonthByPersonal } from 'components/absence/AbsenceMonthTable';
import TableDataItem, { Label } from 'components/common/TableDataItem';

type TableRecord = IFieldAndHost | Absence | AbsenceMonthByPersonal;

type LabelColor = 'yellow' | 'blue';

interface Props {
  color?: LabelColor;
  labels: Label[];
  recordsOfYear: TableRecord[];
  onEditClick?: (month: number) => void;
  isEditable: boolean;
  isFoldable: boolean;
}

export default function Table({
  color = 'yellow',
  labels,
  recordsOfYear,
  onEditClick,
  isEditable,
  isFoldable,
}: Props) {
  const [openTable, setOpenTable] = useState(false);

  const toggleTable = () => setOpenTable(prev => !prev);

  const threeMonthRecord: TableRecord[] = recordsOfYear?.filter(
    doc => doc.month < +thisMonth + 3,
  );

  const showingRecords = openTable ? recordsOfYear : threeMonthRecord;

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/monthlyinfo' || pathname === '/setting/absence') {
      setOpenTable(prev => !prev);
    }
  }, []);

  const tableStyle = {
    blue: 'bg-blue2',
    yellow: 'bg-blue2',
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-card">
      {isFoldable && (
        <button
          className="absolute right-4 top-4"
          type="button"
          onClick={toggleTable}
        >
          {openTable ? (
            <FiChevronUp className="text-lg" />
          ) : (
            <FiChevronDown className="text-lg" />
          )}
        </button>
      )}

      <table className="w-full">
        <colgroup>
          {labels.includes('월') && <col width="18%" />}
          <col width="40%" />
          <col width="40%" />
          {isEditable && <col width="10%" />}
        </colgroup>

        <thead>
          <tr className={`${tableStyle[color]} relative rounded-t-xl`}>
            {labels.map(label => (
              <th key={label} className="py-3 font-medium text-blue1">
                {label}
              </th>
            ))}
            {isEditable && <th aria-label="수정" />}
          </tr>
        </thead>

        <tbody>
          {showingRecords?.map(record => (
            <Fragment key={record.month}>
              <tr>
                {'month' in record && labels.includes('월') && (
                  <TableDataItem label="월" data={record.month} />
                )}
                {'field' in record && (
                  <TableDataItem label="독서분야" data={record.field} />
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
                      <FiEdit stroke="#aaa" />
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
