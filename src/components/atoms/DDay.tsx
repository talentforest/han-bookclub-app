import styled from 'styled-components';
import { getDDay, getLocaleDate } from 'util/index';

interface Props {
  hyphenDate: string;
  isDateMark?: boolean;
}

export default function DDay({ hyphenDate, isDateMark = true }: Props) {
  return (
    <DDayBox>
      <div>
        <span className='d-day'>D-DAY:</span>
        <span className='leftDay'>{getDDay(hyphenDate)}</span>
      </div>

      {isDateMark && (
        <span className='date'>({getLocaleDate(hyphenDate)})</span>
      )}
    </DDayBox>
  );
}

const DDayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .d-day {
    font-size: 13px;
    margin-top: 2px;
  }
  .leftDay {
    font-size: 16px;
    color: ${({ theme }) => theme.text.blue2};
  }
  .date {
    font-size: 14px;
    margin-top: 2px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;
