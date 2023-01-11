import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import DatePicker from 'react-datepicker';
import Subtitle from 'components/atoms/Subtitle';

interface IDateProps {
  endDate: Date;
  setEndDate: (date: Date) => void;
}

const VoteDeadLine = ({ endDate, setEndDate }: IDateProps) => {
  return (
    <Deadline>
      <Subtitle title='투표 종료일 설정' />
      <DatePick
        name='datepick'
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        endDate={endDate}
        minDate={new Date()}
        locale={ko}
        dateFormat='yyyy년 MM월 dd일'
      />
    </Deadline>
  );
};

const Deadline = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  span {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  @media ${device.tablet} {
    span {
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
`;
const DatePick = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px;
  }
`;

export default VoteDeadLine;
