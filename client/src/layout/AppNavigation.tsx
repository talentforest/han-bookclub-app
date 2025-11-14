import { Link, useLocation } from 'react-router-dom';

import { FiArchive, FiCoffee, FiHome, FiUser } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

import { useAlertAskJoin } from '@/hooks';

import LogoImg from '@/components/common/LogoImg';

type AppNavigation = {
  name: string;
  to: string;
  icon: React.ReactNode;
  active: boolean;
  state?: { userId: string };
  onClick?: (event: React.FormEvent) => void;
};

export default function AppNavigation({ type }: { type: 'top' | 'bottom' }) {
  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const iconClassName = 'text-[15px]';

  const match = location.pathname.match(/\/bookclub\/(\d{4}-\d{2})(?:\/|$)/);
  const yearMonthIdSegment = match ? match[1] : null;
  const prevYearMonthId =
    new Date(yearMonthIdSegment).getTime() < new Date().getTime();

  const navigationList: AppNavigation[] = [
    {
      name: '홈',
      to: '/',
      icon: <FiHome className={`${iconClassName}`} />,
      active: pathname === '/',
    },
    {
      name: '지난 모임',
      to: '/previous-bookclub',
      icon: <FiArchive className={`${iconClassName}`} />,
      active: !!(
        pathname.includes('previous-bookclub') ||
        (pathname.includes('/bookclub') &&
          yearMonthIdSegment &&
          prevYearMonthId)
      ),
    },
    {
      name: '이달의 모임',
      to: '/bookclub',
      icon: <FiCoffee className={`${iconClassName}`} />,
      active: pathname.includes('/bookclub') && !yearMonthIdSegment,
    },
    {
      name: '투표하기',
      to: '/vote',
      icon: <MdOutlineHowToVote className={`${iconClassName}`} />,
      active: pathname.includes('vote'),
    },
    {
      name: '나의 책장',
      to: '/bookshelf',
      icon: <FiUser className={`${iconClassName}`} />,
      onClick: blockLinkAndAlertJoinMember,
      active: pathname === '/bookshelf',
    },
  ];

  return (
    <>
      {type === 'top' &&
        !pathname.includes('create_account') &&
        pathname !== '/login' && (
          <nav className="header mb-4 flex items-center justify-between py-8 max-sm:hidden">
            <Link to="/" className="flex items-center gap-1">
              <LogoImg className="size-6" />
              <span className="text-[17px] font-medium">독서모임 한페이지</span>
            </Link>

            <ul className="flex gap-x-8">
              {navigationList.map(({ name, to, state, onClick, active }) => (
                <li key={to}>
                  <Link to={to} state={state} onClick={onClick}>
                    <span
                      className={`${active ? 'font-semibold text-text' : 'text-gray1'}`}
                    >
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

      {type === 'bottom' &&
        pathname !== '/login' &&
        !pathname.includes('setting') && (
          <nav className="fixed bottom-0 left-0 z-10 hidden w-full rounded-t-2xl bg-white py-3.5 shadow-card max-sm:block">
            <ul className="flex justify-evenly">
              {navigationList.map(
                ({ to, name, icon, state, onClick, active }) => (
                  <li
                    key={to}
                    className={`flex w-[20%] cursor-pointer flex-col items-center justify-center text-[10px] ${active ? 'text-text' : 'text-gray2'}`}
                  >
                    <Link
                      to={to}
                      state={state}
                      onClick={onClick}
                      className="flex w-full flex-col items-center justify-center gap-1"
                    >
                      {icon}
                      <span>{name}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        )}
    </>
  );
}
