import styled from 'styled-components';
import device from 'theme/mediaQueries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { ChangeEvent, MutableRefObject } from 'react';
import { FiCalendar } from 'react-icons/fi';

interface Props<T> {
  label: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
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
    <InputBox>
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
            timeCaption='시작시간'
            placeholderText='정해진 모임 시간이 없습니다'
            locale={ko}
            dateFormat='MM월 dd일 a hh:mm'
          />
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
    </InputBox>
  );
}

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 8px;
  > div.label {
    border: 1px solid ${(props) => props.theme.text.lightGray};
    width: 75px;
    height: 100%;
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
    border: 1px solid ${(props) => props.theme.text.lightGray};
    height: 100%;
    width: 200px;
    padding: 10px 8px 8px 6px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 15px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

const InputContainerBox = styled.div`
  border: 1px solid ${(props) => props.theme.text.lightGray};
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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

  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px;
  }
`;
