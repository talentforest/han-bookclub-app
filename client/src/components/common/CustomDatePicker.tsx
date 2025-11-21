import { ko } from 'date-fns/locale';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiX } from 'react-icons/fi';

import Label from '@/components/common/input/Label';

interface CustomDatePickerProps {
  label?: string;
  resetDate?: () => void;
}

export default function CustomDatePicker({
  label,
  resetDate,
  ...rest
}: CustomDatePickerProps & DatePickerProps) {
  return (
    <div className="flex flex-col">
      {label && <Label text={label} />}

      <div className="relative">
        <FiCalendar className="absolute left-3 top-3.5 z-[1] size-5" />
        <DatePicker
          {...rest}
          locale={ko}
          minDate={new Date()}
          shouldCloseOnSelect
          popperPlacement="bottom"
          timeCaption="모임시간"
          timeInputLabel="모임시간:"
          timeFormat="HH:mm"
          timeIntervals={10}
          onFocus={e => e.target.blur()}
          className={`h-12 w-full rounded-xl border border-gray1 px-3 py-2 pl-10 placeholder:text-gray2 hover:bg-blue-50 focus:outline-none ${rest.className}`}
        />
        {resetDate && (
          <button type="button" onClick={resetDate}>
            <FiX className="absolute right-3 top-3 z-[1] size-[23px] text-gray1" />
          </button>
        )}
      </div>
    </div>
  );
}
