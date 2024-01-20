import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type PageHeaderTitle =
  | '독서모임 한페이지'
  | '지난 한페이지 모임'
  | '이달의 한페이지 모임'
  | '한페이지의 투표함'
  | `${string}의 책장`;

type DetailPageHeaderTitle =
  | '도서 정보'
  | '투표함'
  | `${string}의 한페이지 모임`
  | `${string}의 한페이지 발제문`
  | `${string}의 한페이지 정리 기록`
  | '한페이지 정리 기록'
  | '도서 검색'
  | '설정'
  | '프로필 정보'
  | '비밀번호 변경'
  | '탈퇴';

interface Props {
  title: PageHeaderTitle | DetailPageHeaderTitle;
  backBtn?: boolean;
  settingBtn?: boolean;
}

const MobileHeader = ({ title, backBtn, settingBtn }: Props) => {
  const navigate = useNavigate();

  const onBackClick = () => navigate(-1);

  return (
    <Header>
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
      <h1>{title}</h1>

      {settingBtn && (
        <Link to='/setting'>
          <FiSettings fontSize={18} />
        </Link>
      )}
    </Header>
  );
};

const Header = styled.header`
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
  h1 {
    color: ${({ theme }) => theme.text.gray4};
    font-size: 18px;
    flex: 1;
  }
  @media ${device.tablet} {
    display: none;
  }
`;

export default MobileHeader;
