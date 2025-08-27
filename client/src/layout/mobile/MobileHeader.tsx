import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';

import { DetailPageHeaderTitle, NotLogInPage, PageHeaderTitle } from '@/types';

interface MobileHeaderProps {
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
}: MobileHeaderProps) {
  const navigate = useNavigate();

  const onBackClick = () => navigate(-1);

  return (
    <header
      className={`items-center gap-2 py-4 max-sm:flex ${showDesktop ? 'flex' : 'hidden'}`}
    >
      {title === '독서모임 한페이지' && (
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/hanpage_logo.png`}
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
