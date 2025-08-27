import { Link, useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useAlertAskJoin } from '@/hooks';

import { thisYearMonthId } from '@/utils';

import LogoImg from '@/components/common/LogoImg';

const TopNavigation = () => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const navigationList = [
    {
      name: '지난 한페이지',
      to: '/previous-club',
    },
    {
      name: '이달의 한페이지',
      to: '/bookclub',
      state: { docId: thisYearMonthId },
    },
    {
      name: '투표하기',
      to: '/vote',
    },
    {
      name: '나의 책장',
      to: '/bookshelf',
      state: { userId: uid },
      onClick: blockLinkAndAlertJoinMember,
    },
    {
      name: '설정',
      to: '/setting',
    },
  ];

  return (
    <>
      {!pathname.includes('create_account') && pathname !== '/login' && (
        <nav className="mb-4 flex items-center justify-between py-8 max-sm:hidden">
          <Link to="/" className="flex items-center gap-1">
            <LogoImg className="size-6" />
            <span className="text-[17px] font-medium">독서모임 한페이지</span>
          </Link>

          <ul className="flex gap-x-8">
            {navigationList.map(({ name, to, state, onClick }) => (
              <li key={to}>
                <Link to={to} state={state} onClick={onClick}>
                  <span
                    className={`${pathname.includes(to) ? 'font-semibold text-text' : 'text-gray1'}`}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default TopNavigation;
