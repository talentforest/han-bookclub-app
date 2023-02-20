import { Link, useLocation } from 'react-router-dom';
import { AutoStories, History } from '@mui/icons-material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    pathname !== '/login' &&
    !pathname.includes('setting') &&
    !pathname.includes('userInfo') && (
      <Nav>
        <List>
          <Item $active={pathname === '/'}>
            <Link to='/'>
              <HomeIcon />
              <span>홈</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/history')}>
            <Link to='/history'>
              <History />
              <span>지난 모임</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/bookclub')}>
            <Link to='/bookclub'>
              <AutoStories />
              <span>이달의 모임</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/vote')}>
            <Link to='/vote'>
              <HowToVoteIcon />
              <span>투표하기</span>
            </Link>
          </Item>
          <Item $active={pathname.includes('/mybookshelf')}>
            <Link to='/mybookshelf'>
              <AccountCircleIcon />
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
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px 0;
  background-color: ${(props) => props.theme.bgColor};
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
  > a {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      margin-bottom: 5px;
      fill: ${(props) => (props.$active ? '#333' : '#aaa')};
    }
    span {
      color: ${(props) =>
        props.$active ? props.theme.text.default : props.theme.text.gray};
    }
  }
`;

export default Navigation;
