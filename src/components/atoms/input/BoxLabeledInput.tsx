import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { ChangeEvent, MutableRefObject } from 'react';
import { FiCalendar } from 'react-icons/fi';
import device from 'theme/mediaQueries';

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
      <label htmlFor={label} className='label'>
        {label}
      </label>

      <InputBox>
        {label === '모임 시간' ? (
          <DatePicker
            id='모임 시간'
            selected={value as Date}
            onChange={(date) => setValue(date as Date as T)}
            selectsEnd
            endDate={value as Date}
            minDate={new Date()}
            showTimeInput
            timeInputLabel='시간:'
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='모임 시간'
            placeholderText='정해진 모임 시간이 없습니다'
            locale={ko}
            dateFormat='MM월 dd일 a hh:mm'
            shouldCloseOnSelect={false}
            popperPlacement='bottom'
          >
            <button className='react-datepicker___submit_btn'>완료</button>
          </DatePicker>
        ) : (
          <input
            ref={placeInputRef}
            type='text'
            id='모임 장소'
            value={value as string}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder='정해진 모임 장소가 없습니다'
          />
        )}
      </InputBox>

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
    </LabeledBox>
  );
}

export const LabeledBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  > .label {
    height: 100%;
    min-width: 76px;
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
`;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 15px;
  display: flex;
  input {
    /* 인풋 공통 스타일 */
    border: none;
    height: 100%;
    padding: 12px 8px 8px 12px;
    font-size: 15px;
    flex: 1;
    width: inherit;
    background-color: transparent;
  }
  .react-datepicker-wrapper {
    display: flex;
    flex: 1;
  }
  .react-datepicker__input-container {
    display: flex;
    flex: 1;
  }

  /* 날짜 캘린더 */
  .react-datepicker {
    border: 1px solid ${({ theme }) => theme.text.gray2};
    font-size: 15px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::after {
    border-bottom-color: #c8d3ff;
  }

  .react-datepicker__header {
    background-color: #c8d3ff;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #4872f9;
    border-width: 2px 2px 0 0;
    height: 7px;
    width: 7px;
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

  /* 완료 버튼 */
  .react-datepicker___submit_btn {
    border: 1px solid ${({ theme }) => theme.text.gray2};
    position: absolute;
    bottom: -40px;
    height: 40px;
    left: -1px;
    right: -1px;
    padding: 10px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #c8d3ff;
    font-size: 16px;
  }

  /* 시간 */
  .react-datepicker__input-time-container {
    float: none;
    margin: 0;
    padding: 0 15px;
    border-top: 1px solid ${({ theme }) => theme.container.purple2};
  }
  @media ${device.tablet} {
    input {
      font-size: 16px;
    }
  }
`;
