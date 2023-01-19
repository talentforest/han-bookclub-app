import { AccountCircle, Settings } from '@mui/icons-material';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { authService } from 'fbase';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const MobileHeader = () => {
  const currentUser = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchDetailMatch = useMatch('/search/:id');
  const voteDetailMatch = useMatch('/vote/:id');
  const historyDetailMatch = useMatch('/history/:id');
  const bookClubMatch = useMatch('/bookclub/*');

  const onClick = () => {
    navigate(-1);
  };

  const onUserImgClick = () => {
    anonymous ? navigate('/login') : navigate('/mybookshelf');
  };

  function mainPageTitle() {
    if (bookClubMatch) return '이달의 한페이지';
    switch (pathname) {
      case '/':
        return '독서모임 한페이지';
      case '/history':
        return '지난 한페이지';
      case '/vote':
        return '한페이지의 투표함';
      default:
        break;
    }
  }

  function detailPageTitle() {
    if (searchDetailMatch) return '도서 정보';
    if (voteDetailMatch) return '투표함';
    if (historyDetailMatch) return '지난 한페이지';
    switch (pathname) {
      case '/find_pw':
        return '비밀번호 찾기';
      case '/setting':
        return '설정';
      case '/setting/edit-profile':
        return '프로필 정보';
      case '/setting/edit-password':
        return '비밀번호 변경하기';
      case '/create_account':
        return '계정 생성하기';
      case '/setting/delete-account':
        return '탈퇴';
      case '/search':
        return '책 검색하기';
      default:
        break;
    }
  }

  return (
    <>
      {mainPageTitle() && (
        <Header>
          {mainPageTitle()}
          {currentUser?.photoURL?.length ? (
            <UserImg
              onClick={onUserImgClick}
              src={currentUser?.photoURL}
              alt='profileimg'
            />
          ) : (
            anonymous && <AccountCircle onClick={onUserImgClick} />
          )}
        </Header>
      )}
      {detailPageTitle() && (
        <BackButtonHeader onClick={onClick}>
          <ArrowBackIosNewIcon />
          {detailPageTitle()}
        </BackButtonHeader>
      )}
      {pathname === '/mybookshelf' && (
        <SettingIconHeader>
          나의 책장
          <Link to='/setting'>
            <Settings />
          </Link>
        </SettingIconHeader>
      )}
    </>
  );
};

export const Header = styled.header`
  height: 55px;
  padding: 15px 20px;
  position: relative;
  color: ${(props) => props.theme.text.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;
export const SettingIconHeader = styled(Header)`
  button,
  a {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 12px;
    color: ${(props) => props.theme.text.lightBlue};
    border: none;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;
    margin: 0;
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 20px;
      height: 20px;
      margin-right: 3px;
    }
  }
  a {
    svg {
      fill: ${(props) => props.theme.text.default};
      width: 22px;
      height: 22px;
      margin-right: 0px;
    }
  }
`;
const BackButtonHeader = styled(Header)`
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  svg {
    cursor: pointer;
    width: 18px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 5px;
  }
  @media ${device.tablet} {
    /* 계정 생성하기를 위한 css */
    margin: 40px 60px;
    font-size: 20px;
  }
`;
const UserImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export default MobileHeader;
