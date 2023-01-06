import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const DesktopNav = () => {
  const { pathname } = useLocation();

  return (
    !pathname.includes('create_account') && (
      <Nav>
        <Link to='/'>
          <Logo>한 페이지: Han Page</Logo>
        </Link>
        <List>
          <Item $active={pathname.includes('/history')}>
            <Link to='/history'>지난 책모임</Link>
          </Item>
          <Item $active={pathname.includes('/bookclub')}>
            <Link to='/bookclub'>이달의 책모임</Link>
          </Item>
          <Item $active={pathname.includes('/vote')}>
            <Link to='/vote'>투표하기</Link>
          </Item>
          <Item $active={pathname.includes('/profile')}>
            <Link to='/mybookshelf'>나의 책장</Link>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 20px 80px;
  @media ${device.desktop} {
    padding: 20px 160px;
  }
`;
const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.text.lightBlue};
`;
const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0 20px;
  @media ${device.desktop} {
    gap: 0 25px;
  }
`;
const Item = styled.li<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  a {
    color: ${(props) =>
      props.$active ? props.theme.text.lightBlue : props.theme.text.default};
  }
`;

export default DesktopNav;
