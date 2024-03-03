import { currentUserState } from 'data/userAtom';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

interface Props {
  title: string;
  to: string;
  userState?: boolean;
}

export default function LinkChevronRightBtn({
  title,
  to,
  userState = false,
}: Props) {
  const currUser = useRecoilValue(currentUserState);

  return (
    <LinkBtn to={to} state={userState ? { userId: currUser.uid } : null}>
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
    margin-bottom: 1px;
    font-size: 12px;
    fill: ${({ theme }) => theme.text.gray3};
  }
`;
