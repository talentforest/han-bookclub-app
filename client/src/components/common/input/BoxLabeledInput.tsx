import { ChangeEvent, MutableRefObject } from 'react';

import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';

interface Props<T> {
  label: string;
  value: T;
  setValue?: React.Dispatch<React.SetStateAction<T>>;
  placeInputRef?: MutableRefObject<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function BoxLabeledInput<T>({
  label,
  value,
  setValue,
  placeInputRef,
  onFocus,
  onBlur,
}: Props<T>) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T);
  };

  return (
    <div className="relative flex h-[40px] w-full items-center rounded-xl shadow-card">
      <label
        htmlFor={label}
        className="flex h-full min-w-[76px] items-center justify-center rounded-l-xl p-2.5 text-sm text-gray1"
      >
        {label}
      </label>

      <div className="flex size-full rounded-r-xl">
        {label === '모임 시간' ? (
          <DatePicker
            id="모임 시간"
            selected={value as Date}
            onChange={() => {
              // setValue(date);
            }}
            placeholderText="정해진 모임 시간이 없습니다"
            locale={ko}
            dateFormat="MM월 dd일 a hh:mm"
            shouldCloseOnSelect={false}
            popperPlacement="bottom"
            className="w-full border-0 outline-none"
            showTimeInput
            timeCaption="모임 시간"
            timeInputLabel="시간:"
            timeFormat="HH:mm"
            timeIntervals={10}
          >
            <button className="react-datepicker___submit_btn">완료</button>
          </DatePicker>
        ) : (
          <input
            ref={placeInputRef}
            type="text"
            id="모임 장소"
            value={value as string}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="정해진 모임 장소가 없습니다"
            className="h-full w-full flex-1 border-0 bg-transparent p-3 text-sm"
          />
        )}
      </div>

      {label === '모임 시간' && (
        <FiCalendar
          fontSize={16}
          style={{
            position: 'absolute',
            right: 10,
            paddingBottom: 2,
          }}
        />
      )}
    </div>
  );
}
