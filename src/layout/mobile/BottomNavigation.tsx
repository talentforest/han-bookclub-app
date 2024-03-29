import { Link, useLocation, useMatch } from 'react-router-dom';
import { FiHome, FiArchive, FiCoffee, FiUser } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';

import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

const BottomNavigation = () => {
  const currentUser = useRecoilValue(currentUserState);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const bookShelfMatch = useMatch('bookshelf/:id');

  return (
    pathname !== '/login' &&
    !bookShelfMatch &&
    !pathname.includes('setting') &&
    !pathname.includes('userInfo') && (
      <Nav>
        <List>
          <Item $active={pathname === '/'}>
            <Link to='/'>
              <FiHome style={{ color: 'red' }} />
              <span>홈</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/history')}>
            <Link to='/history'>
              <FiArchive />
              <span>지난 모임</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/bookclub')}>
            <Link to='/bookclub'>
              <FiCoffee />
              <span>이달의 모임</span>
            </Link>
          </Item>
          <Item className='vote' $active={pathname.includes('vote')}>
            <Link to='/vote'>
              <MdOutlineHowToVote />
              <span>투표하기</span>
            </Link>
          </Item>
          <Item $active={pathname === '/bookshelf'}>
            <Link
              onClick={blockLinkAndAlertJoinMember}
              to={`/bookshelf`}
              state={{ userId: currentUser.uid }}
            >
              <FiUser />
              <span>나의 책장</span>
            </Link>
          </Item>
        </List>
      </Nav>
    )
  );
};

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0 5px;
  background-color: ${({ theme }) => theme.bgColor};
  @media ${device.tablet} {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;

const Item = styled.li<{ $active: boolean }>`
  width: 20%;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &.vote {
    > a {
      > svg {
        fill: ${({ $active }) => ($active ? '#333' : '#aaa')};
      }
    }
  }
  > a {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      margin-bottom: 6px;
      stroke: ${({ $active }) => ($active ? '#333' : '#aaa')};
    }
    span {
      color: ${({ $active, theme }) =>
        $active ? theme.text.default : theme.text.gray4};
    }
  }
`;

export default BottomNavigation;
