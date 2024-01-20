import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { ChangeEvent, MutableRefObject } from 'react';
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
    <LabeledBox>
      <div className='label'>{label}</div>

      {label === '모임 시간' ? (
        <InputContainerBox>
          <DateTimePicker
            name='datepicker'
            selected={value as Date}
            onChange={(date) => {
              setValue(date as Date as T);
            }}
            selectsEnd
            endDate={value as Date}
            minDate={new Date()}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='모임 시간'
            placeholderText='정해진 모임 시간이 없습니다'
            locale={ko}
            dateFormat='MM월 dd일 a hh:mm'
            shouldCloseOnSelect={false}
            popperPlacement='bottom'
          >
            <button className='react-datepicker___button'>완료</button>
          </DateTimePicker>
        </InputContainerBox>
      ) : (
        <input
          ref={placeInputRef}
          type='text'
          value={value as string}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder='정해진 모임 장소가 없습니다'
        />
      )}

      {label === '모임 시간' && (
        <FiCalendar
          fontSize={16}
          style={{ position: 'absolute', right: 10, paddingBottom: 2 }}
        />
      )}
    </LabeledBox>
  );
}

export const LabeledBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 8px;
  width: 100%;
  > div.label {
    border: 1px solid ${({ theme }) => theme.text.gray1};
    height: 100%;
    min-width: 74px;
    background-color: #eaeaea;
    color: #888;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 8px 8px 10px;
    font-size: 15px;
  }
  > input {
    height: 100%;
    flex: 1;
    padding: 10px 8px 8px 6px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 15px;
    border: 1px solid ${({ theme }) => theme.text.gray1};
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

const InputContainerBox = styled.div`
  border: 1px solid ${({ theme }) => theme.text.gray1};
  height: 100%;
  flex: 1;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  input {
    flex: 1;
    width: auto;
  }
  .react-datepicker {
    border: 1px solid ${({ theme }) => theme.text.gray2};
    font-size: 14px;
    display: flex;
    width: 327px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::after {
    border-bottom-color: #c8d3ff;
  }

  .react-datepicker___button {
    border: 1px solid ${({ theme }) => theme.text.gray2};
    position: absolute;
    bottom: -35px;
    height: 35px;
    left: -1px;
    width: 327px;
    padding: 10px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #c8d3ff;
  }

  .react-datepicker__header {
    background-color: #c8d3ff;
  }

  .react-datepicker__month-container {
    float: none;
  }

  /* 요일들 */
  .react-datepicker__day-name {
    color: #666;
    margin-top: 6px;
  }

  /* day: 주말 날짜 */
  .react-datepicker__day:nth-child(1) {
    color: red; /* 일요일 날짜*/
  }

  /* 선택된 날짜 */
  .react-datepicker__day--selected {
    background-color: #c8d3ff;
    color: #662df7;
  }

  /* 날짜에 마우스를 올릴 때 */
  .react-datepicker__day:hover {
    background-color: #aabbfe;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: #c8d3ff;
    color: #662df7;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    margin: 0 5px;
    height: 25px;
    border-radius: 6px;
  }
  .react-datepicker__navigation-icon::before {
    border-color: #4872f9;
    border-width: 2px 2px 0 0;
    height: 7px;
    width: 7px;
  }
`;

const DateTimePicker = styled(DatePicker)`
  border: none;
  height: 100%;
  width: 200px;
  padding: 11px 8px 8px 6px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

// 달력 커스텀
