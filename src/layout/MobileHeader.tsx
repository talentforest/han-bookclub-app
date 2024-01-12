import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const MobileHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchDetailMatch = useMatch('/search/:id');
  const voteDetailMatch = useMatch('/vote/:id');
  const historyDetailMatch = useMatch('/history/:id');
  const bookClubMatch = useMatch('/bookclub/*');

  const onBackClick = () => navigate(-1);

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
      case '/login':
        return '뒤로가기';
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
          <img
            src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
            alt='독서모임 한페이지 로고'
          />
          {mainPageTitle()}
        </Header>
      )}

      {detailPageTitle() && (
        <BackButtonHeader onClick={onBackClick}>
          {detailPageTitle()}
        </BackButtonHeader>
      )}

      {pathname === '/mybookshelf' && (
        <SettingIconHeader>
          나의 책장
          <Link to='/setting'></Link>
        </SettingIconHeader>
      )}
    </>
  );
};

export const Header = styled.header`
  padding: 15px 20px 5px;
  position: relative;
  color: ${(props) => props.theme.text.gray};
  display: flex;
  align-items: center;
  font-size: 18px;
  gap: 3px;
  img {
    width: 22px;
    height: 22px;
    margin-bottom: 3px;
  }

  @media ${device.tablet} {
    display: none;
  }
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

export default MobileHeader;
