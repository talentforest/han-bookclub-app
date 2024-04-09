import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import styled from 'styled-components';

interface Props {
  selected: boolean;
  onVoteItemClick: () => void;
}

export default function VoteBookItemBtn({ selected, onVoteItemClick }: Props) {
  return (
    <CheckCircleBtn
      $selected={selected}
      type='button'
      onClick={onVoteItemClick}
    >
      {selected ? (
        <>
          <FiCheckCircle className='check-circle checked' />
          <span className='checked'>해제하기</span>
        </>
      ) : (
        <>
          <FiCircle className='check-circle' />
          <span>선택하기</span>
        </>
      )}
    </CheckCircleBtn>
  );
}

const CheckCircleBtn = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.container.blue1 : theme.container.lightGray};
  padding: 14px 0 6px;
  margin-top: -3px;
  > .check-circle {
    margin-bottom: 5px;
    stroke: ${({ theme }) => theme.text.gray2};
    font-size: 17px;
    &.checked {
      stroke: ${({ theme }) => theme.text.blue3};
    }
  }
  > span {
    font-size: 13px;
    color: ${({ theme }) => theme.text.gray2};
  }
`;
