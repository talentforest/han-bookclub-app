import { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { FiChevronLeft } from 'react-icons/fi';

import { DetailPageHeaderTitle, NotLogInPage, PageHeaderTitle } from '@/types';

interface MobileHeaderProps {
  title: PageHeaderTitle | DetailPageHeaderTitle | NotLogInPage;
  backBtn?: boolean;
  showDesktop?: boolean;
  children?: ReactNode;
  backTo?: string;
  className?: string;
}

export default function MobileHeader({
  title,
  backBtn,
  showDesktop,
  children,
  backTo,
  className,
}: MobileHeaderProps) {
  const navigate = useNavigate();

  const onClick = () => {
    backTo ? navigate(backTo) : navigate(-1);
  };

  return (
    <header
      className={`items-center gap-2 py-4 max-sm:flex ${showDesktop ? 'flex' : 'hidden'} header ${className}`}
    >
      {title === '독서모임 한페이지' && (
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/hanpage_logo.png`}
          alt="독서모임 한페이지 로고"
          className="size-[20px]"
        />
      )}

      {backBtn && (
        <button
          onClick={onClick}
          type="button"
          aria-label="뒤로가기"
          onKeyDown={onClick}
        >
          <FiChevronLeft fontSize={22} />
        </button>
      )}

      <span className="mr-auto text-lg font-medium">{title}</span>

      {children}
    </header>
  );
}
