import { Fragment } from 'react';

import { Month } from '@/data/penaltyAtom';

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
    <div className="z-1 absolute right-0 top-[52px] rounded-xl bg-bg px-2 py-3 shadow-card">
      {penaltyCostList.map(
        ({ title, penaltyMonths }) =>
          penaltyMonths.length !== 0 && (
            <Fragment key={title}>
              <span className="font-xs text-gray1">{title}</span>
              <ul className="m-1 flex flex-wrap gap-1">
                {penaltyMonths.map(month => (
                  <li
                    key={month}
                    className="rounded-xl bg-purple3 px-1 py-2 text-xs"
                  >
                    {month}
                  </li>
                ))}
              </ul>
            </Fragment>
          ),
      )}
      <div className="mt-[12px] flex items-center justify-between border-t-2 border-dotted border-gray3 pt-2">
        <span>합계:</span>
        <span>￦{totalCost}</span>
      </div>
    </div>
  );
}
