import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type PageHeaderTitle =
  | '독서모임 한페이지'
  | '지난 한페이지 독서모임'
  | '이달의 한페이지 독서모임'
  | '한페이지의 투표함'
  | `${string}의 책장`;

type DetailPageHeaderTitle =
  | '공유하고 싶은 문구들'
  | '도서 정보'
  | '투표함'
  | `${string}년 개인별 챌린지`
  | `${string}년 한페이지 독서모임 정보`
  | `${string}의 한페이지 독서모임`
  | `${string}의 한페이지 발제문`
  | `${string}의 한페이지 정리 기록`
  | '한페이지 정리 기록'
  | '도서 검색'
  | '설정'
  | '프로필 정보'
  | '비밀번호 변경'
  | '탈퇴';

type NotLogInPage = '계정 생성' | '비밀번호 찾기';

interface Props {
  title: PageHeaderTitle | DetailPageHeaderTitle | NotLogInPage;
  backBtn?: boolean;
  settingBtn?: boolean;
  showDesktop?: boolean;
}

const MobileHeader = ({
  title,
  backBtn,
  settingBtn,
  showDesktop = false,
}: Props) => {
  const navigate = useNavigate();

  const onBackClick = () => navigate(-1);

  return (
    <Header $showDesktop={showDesktop}>
      {title === '독서모임 한페이지' && (
        <img
          src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
          alt='독서모임 한페이지 로고'
        />
      )}

      {backBtn && (
        <button onClick={onBackClick}>
          <FiChevronLeft fontSize={22} />
        </button>
      )}
      <span>{title}</span>

      {settingBtn && (
        <Link to='/setting'>
          <FiSettings fontSize={18} />
        </Link>
      )}
    </Header>
  );
};

//

const Header = styled.header<{ $showDesktop: boolean }>`
  padding: 15px 20px 5px;
  height: 45px;
  display: flex;
  align-items: center;
  gap: 3px;
  img {
    width: 22px;
    height: 22px;
    margin-bottom: 4px;
  }
  span {
    color: ${({ theme }) => theme.text.gray4};
    font-size: 18px;
    flex: 1;
  }
  svg {
    stroke: ${({ theme }) => theme.text.gray4};
  }
  @media ${device.tablet} {
    height: 45px;
    margin-top: 10px;
    position: relative;
    display: ${({ $showDesktop }) => ($showDesktop ? 'flex' : 'none')};
    align-items: center;
    gap: 3px;
    padding: 20px 80px;
    h1 {
      color: ${({ theme }) => theme.text.gray4};
    }
    h1 {
      font-size: 20px;
    }
  }
  @media ${device.desktop} {
    padding: 0;
    padding-top: 15px 0;
    width: 70%;
    margin: 10px auto;
  }
`;

export default MobileHeader;
