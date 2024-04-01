import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  name: string;
  to: string;
}

export default function TextWithIconLink({ name, to }: Props) {
  return (
    <LinkBtn to={to}>
      <span>{name}</span>
      <FiChevronRight />
    </LinkBtn>
  );
}

const LinkBtn = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 5px;
  align-self: end;
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.container.blue3};
  }
  svg {
    margin-bottom: 2px;
    stroke: ${({ theme }) => theme.container.blue3};
  }
`;
