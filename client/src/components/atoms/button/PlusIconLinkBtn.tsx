import { PostType } from 'components/molecules/PostHandleBtns';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  to: string;
  name: string;
  state?: { id?: string; postType?: PostType; voteDocId?: number };
}

export default function PlusIconWithTextLink({ to, name, state }: Props) {
  return (
    <TitleWithLink to={to} state={state}>
      <FiPlus />
      <span>{name}</span>
    </TitleWithLink>
  );
}

const TitleWithLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 4px;
  span {
    color: ${({ theme }) => theme.text.blue3};
  }
  svg {
    stroke: ${({ theme }) => theme.text.blue3};
  }
`;
