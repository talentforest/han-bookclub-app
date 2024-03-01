import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  openTable: boolean;
  toggleTable: () => void;
}

export default function TableFolderBtn({ openTable, toggleTable }: Props) {
  return (
    <ToggleBtn type='button' onClick={toggleTable}>
      {openTable ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
      <span>{openTable ? '접기' : '전체 보기'}</span>
    </ToggleBtn>
  );
}

const ToggleBtn = styled.button`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: #f4f4f4;
  box-shadow: ${({ theme }) => theme.boxShadow};
  svg {
    font-size: 12px;
    padding-bottom: 2px;
    fill: ${({ theme }) => theme.text.gray2};
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;
