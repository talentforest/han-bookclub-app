import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';

interface CustomDatePickerProps {
  id: string;
  currentDate?: Date;
  onChange: (date: Date | null) => void;
  className?: string;
}

export default function CustomDatePicker({
  id,
  currentDate,
  onChange,
  className,
}: CustomDatePickerProps) {
  return (
    <div className="relative">
      <FiCalendar className="absolute left-3 top-3.5 z-10 size-5" />
      <DatePicker
        id={id}
        selected={currentDate as Date}
        onChange={onChange}
        placeholderText="정해진 모임 시간이 없습니다"
        locale={ko}
        minDate={new Date()}
        dateFormat="MM월 dd일 a hh:mm"
        shouldCloseOnSelect={false}
        popperPlacement="bottom"
        className={`flex h-12 w-full items-center rounded-xl border border-gray2 !py-3 !pl-10 outline-none ${className}`}
        showTimeInput
        timeCaption="시간"
        timeInputLabel="시간:"
        timeFormat="HH:mm"
        timeIntervals={10}
        onFocus={e => e.target.blur()}
      >
        <button
          type="button"
          className="absolute -bottom-8 -left-[1px] -right-[1px] rounded-b-xl border border-t-0 border-gray2 bg-green1 py-2.5 font-SUITE text-[15px] text-darkBlue"
        >
          완료
        </button>
      </DatePicker>
    </div>
  );
}
