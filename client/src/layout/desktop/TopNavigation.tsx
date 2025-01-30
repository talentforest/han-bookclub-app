import { Link, useLocation } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import LogoImg from 'components/common/LogoImg';

const TopNavigation = () => {
  const currentUser = useRecoilValue(currentUserState);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const navigationList = [
    {
      name: '지난 한페이지',
      to: '/history',
    },
    {
      name: '이달의 한페이지',
      to: '/bookclub',
    },
    {
      name: '투표하기',
      to: '/vote',
    },
    {
      name: '나의 책장',
      to: '/bookshelf',
    },
    {
      name: '설정',
      to: '/setting',
    },
  ];

  return (
    <>
      {!pathname.includes('create_account') && pathname !== '/login' && (
        <nav className="flex items-center justify-between py-5 max-sm:hidden">
          <Link to="/" className="flex items-center gap-1">
            <LogoImg className="size-5" />
            <span className="font-medium">독서모임 한페이지</span>
          </Link>

          <ul className="flex gap-x-6">
            {navigationList.map(({ name, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  state={
                    to === '/bookshelf'
                      ? { userId: currentUser.uid }
                      : undefined
                  }
                  onClick={
                    to === '/bookshelf'
                      ? blockLinkAndAlertJoinMember
                      : undefined
                  }
                >
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
