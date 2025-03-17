import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';

type PageHeaderTitle =
  | '독서모임 한페이지'
  | '지난 한페이지'
  | '이달의 한페이지'
  | '한페이지 투표함'
  | `${string}의 책장`;

type DetailPageHeaderTitle =
  | '공유하고 싶은 문구들'
  | '도서 정보'
  | `${string}모임책 투표함`
  | `${string}년 개인별 챌린지`
  | `${string}년 독서모임 한페이지 정보`
  | `${string}년 ${string} 정보`
  | `${string}의 한페이지`
  | `${string}의 한페이지 발제문`
  | `${string}의 한페이지 정리 기록`
  | '한페이지 정리 기록'
  | '도서 검색'
  | '설정'
  | '나의 모임불참 설정'
  | '개발자도구'
  | '알림'
  | '프로필 정보'
  | '비밀번호 변경'
  | '탈퇴';

type NotLogInPage = '계정 생성' | '비밀번호 찾기';

interface Props {
  title: PageHeaderTitle | DetailPageHeaderTitle | NotLogInPage;
  backBtn?: boolean;
  showDesktop?: boolean;
  children?: ReactNode;
}

export default function MobileHeader({
  title,
  backBtn,
  showDesktop,
  children,
}: Props) {
  const navigate = useNavigate();

  const onBackClick = () => navigate(-1);

  return (
    <header
      className={`items-center gap-2 py-4 max-sm:flex ${showDesktop ? 'flex' : 'hidden'}`}
    >
      {title === '독서모임 한페이지' && (
        <img
          src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
          alt="독서모임 한페이지 로고"
          className="size-[20px]"
        />
      )}

      {backBtn && (
        <button onClick={onBackClick}>
          <FiChevronLeft fontSize={22} />
        </button>
      )}

      <span className="mr-auto text-lg font-medium">{title}</span>

      {children}
    </header>
  );
}
