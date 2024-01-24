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
  place-self: end;
  margin-bottom: 5px;

  span {
    font-size: 15px;
    color: ${({ theme }) => theme.container.blue3};
  }
  svg {
    margin-bottom: 3px;
    stroke: ${({ theme }) => theme.container.blue3};
  }
`;
