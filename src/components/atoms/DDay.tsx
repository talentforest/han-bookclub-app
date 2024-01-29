import styled from 'styled-components';
import { getDDay, getLocaleDate } from 'util/index';

interface Props {
  hyphenDate: string;
  isDateMark?: boolean;
}

export default function DDay({ hyphenDate, isDateMark = true }: Props) {
  return (
    <DDayBox>
      <span>
        디데이: <span className='dday'>{getDDay(hyphenDate)}</span>
      </span>
      {isDateMark && (
        <span className='date'>({getLocaleDate(hyphenDate)})</span>
      )}
    </DDayBox>
  );
}

const DDayBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: ${({ theme }) => theme.text.gray3};
  }
  .date {
    font-size: 13px;
    margin-top: 2px;
  }
  .dday {
    color: ${({ theme }) => theme.text.blue2};
  }
`;
