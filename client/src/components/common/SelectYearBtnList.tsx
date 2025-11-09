import { operationYearList } from '@/appConstants';

import SquareBtn from '@/components/common/button/SquareBtn';

interface SelectedYearBtnListProps {
  selectedYear: string;
  handleChangeYear: (year: string) => void;
  buttonClassName?: string;
}

export default function SelectYearBtnList({
  selectedYear,
  handleChangeYear,
  buttonClassName = '',
}: SelectedYearBtnListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {operationYearList.map(year => (
        <li key={year}>
          <SquareBtn
            color={year === selectedYear ? 'blue' : 'gray'}
            name={`${year}년`}
            type="button"
            handleClick={() => handleChangeYear(year)}
            className={buttonClassName}
          />
        </li>
      ))}
    </ul>
  );
}
