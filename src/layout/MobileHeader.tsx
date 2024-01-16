import { FiChevronLeft } from 'react-icons/fi';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const MobileHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchDetailMatch = useMatch('/search/:id');
  const voteDetailMatch = useMatch('/vote/:id');
  const historyDetailMatch = useMatch('/history/:id');
  const historyHostReviewMatch = useMatch('/history/:id/host-review');
  const historySubjectsMatch = useMatch('/history/:id/subjects');
  const bookClubMatch = useMatch('/bookclub');
  const bookClubSubjectsMatch = useMatch('/bookclub/subjects');
  const bookClubHostReviewMatch = useMatch('/bookclub/host-review');

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
    if (historyDetailMatch) {
      const year = historyDetailMatch.params.id.slice(0, 4);
      const month = historyDetailMatch.params.id.slice(-2);
      return `${year}년 ${month}월의 한페이지 모임`;
    }
    if (historyHostReviewMatch) {
      const year = historyHostReviewMatch.params.id.slice(0, 4);
      const month = historyHostReviewMatch.params.id.slice(-2);
      return `${year}년 ${month}월 모임의 정리 기록`;
    }
    if (historySubjectsMatch) {
      const year = historySubjectsMatch.params.id.slice(0, 4);
      const month = historySubjectsMatch.params.id.slice(-2);
      return `${year}년 ${month}월 모임의 발제문`;
    }
    if (bookClubSubjectsMatch) return '이달의 한페이지 발제문';
    if (bookClubHostReviewMatch) return '이달의 한페이지 정리 기록';

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
        return '비밀번호 변경';
      case '/create_account':
        return '계정 생성';
      case '/setting/delete-account':
        return '탈퇴';
      case '/search':
        return '도서 검색';
      default:
        break;
    }
  }

  return (
    <>
      {mainPageTitle() && (
        <Header>
          {mainPageTitle() === '독서모임 한페이지' && (
            <img
              src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
              alt='독서모임 한페이지 로고'
            />
          )}
          {mainPageTitle()}
        </Header>
      )}

      {detailPageTitle() && (
        <BackButtonHeader onClick={onBackClick}>
          <FiChevronLeft fontSize={22} style={{ margin: '0 4px 2px 0' }} />
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
  padding: 20px 20px 5px;
  height: 40px;
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

  @media ${device.tablet} {
    /* 계정 생성하기를 위한 css */
    margin: 40px 60px;
    font-size: 20px;
  }
`;

export default MobileHeader;
