import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  title: string;
  to: string;
}

export default function LinkChevronRightBtn({ title, to }: Props) {
  return (
    <LinkBtn to={to}>
      <span>{title}</span>
      <FaChevronRight />
    </LinkBtn>
  );
}

const LinkBtn = styled(Link)`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 3px;
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.text.gray3};
  }
  svg {
    margin-bottom: 3px;
    font-size: 13px;
    fill: ${({ theme }) => theme.text.gray3};
  }
`;
