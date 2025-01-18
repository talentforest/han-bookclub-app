import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    <DatePicker
      id={id}
      selected={currentDate as Date}
      onChange={onChange}
      placeholderText="정해진 모임 시간이 없습니다"
      locale={ko}
      dateFormat="MM월 dd일 a hh:mm"
      shouldCloseOnSelect={false}
      popperPlacement="bottom"
      showIcon
      className={`w-full rounded-xl border p-4 outline-none ${className}`}
      showTimeInput
      timeCaption="시간"
      timeInputLabel="시간:"
      timeFormat="HH:mm"
      timeIntervals={10}
    >
      <button className="react-datepicker___submit_btn">완료</button>
    </DatePicker>
  );
}
