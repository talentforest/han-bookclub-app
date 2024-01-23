import { currentUserState } from 'data/userAtom';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const TopNavigation = () => {
  const currentUser = useRecoilValue(currentUserState);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  return (
    !pathname.includes('create_account') &&
    pathname !== '/login' && (
      <Nav>
        <Link to='/'>
          <Logo $active={pathname === '/'}>
            <img
              src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
              alt='독서모임 한페이지 로고'
            />
            <span>독서모임 한페이지</span>
          </Logo>
        </Link>
        <List>
          <Item $active={pathname.includes('/history')}>
            <Link to='/history'>지난 한페이지</Link>
          </Item>
          <Item $active={pathname.includes('/bookclub')}>
            <Link to='/bookclub'>이달의 한페이지</Link>
          </Item>
          <Item $active={pathname.includes('/vote')}>
            <Link to='/vote'>투표하기</Link>
          </Item>
          <Item $active={pathname.includes('/bookshelf')}>
            <Link
              to='/bookshelf'
              onClick={blockLinkAndAlertJoinMember}
              state={{ userId: currentUser?.uid }}
            >
              나의 책장
            </Link>
          </Item>
          <Item $active={pathname.includes('/setting')}>
            <Link to='/setting'>설정</Link>
          </Item>
        </List>
      </Nav>
    )
  );
};

const Nav = styled.nav`
  display: none;
  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 20px 80px;
  }
  @media ${device.desktop} {
    padding: 0;
    width: 70%;
    margin: 0 auto;
  }
`;

const Logo = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  img {
    width: auto;
    height: 20px;
    margin-bottom: 2px;
  }
  span {
    color: ${({ $active, theme }) =>
      $active ? theme.text.blue2 : theme.text.default};
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0 15px;
  font-size: 15px;
  @media ${device.desktop} {
    gap: 0 20px;
  }
`;

const Item = styled.li<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  a {
    color: ${({ $active, theme }) =>
      $active ? theme.text.blue2 : theme.text.default};
  }
`;

export default TopNavigation;
