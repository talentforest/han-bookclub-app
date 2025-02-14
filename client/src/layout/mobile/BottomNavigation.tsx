import { Link, useLocation, useMatch } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { FiArchive, FiCoffee, FiHome, FiUser } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';
import { thisYearMonthId } from 'utils';

const BottomNavigation = () => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const bookShelfMatch = useMatch('/bookshelf/:id');

  const iconClassName = 'text-[15px]';

  const navigationList = [
    {
      name: '홈',
      to: '/',
      icon: <FiHome className={`${iconClassName}`} />,
    },
    {
      name: '지난 모임',
      to: '/previous-club',
      icon: <FiArchive className={`${iconClassName}`} />,
    },
    {
      name: '이달의 모임',
      to: '/bookclub',
      icon: <FiCoffee className={`${iconClassName}`} />,
      state: { docId: thisYearMonthId },
    },
    {
      name: '투표하기',
      to: '/vote',
      icon: <MdOutlineHowToVote className={`${iconClassName}`} />,
    },
    {
      name: '나의 책장',
      to: '/bookshelf',
      icon: <FiUser className={`${iconClassName}`} />,
      state: { userId: uid },
      onClick: blockLinkAndAlertJoinMember,
    },
  ];

  return (
    pathname !== '/login' &&
    !bookShelfMatch &&
    !pathname.includes('setting') &&
    !pathname.includes('userInfo') && (
      <nav className="fixed bottom-0 left-0 z-10 hidden w-full rounded-t-2xl bg-white py-3.5 shadow-card max-sm:block">
        <ul className="flex justify-evenly">
          {navigationList.map(({ to, name, icon, state, onClick }) => (
            <li
              key={to}
              className={`flex w-[20%] cursor-pointer flex-col items-center justify-center text-[10px] ${(to === '/' ? to === pathname : pathname.includes(to)) ? 'text-text' : 'text-gray2'}`}
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
          ))}
        </ul>
      </nav>
    )
  );
};

export default BottomNavigation;
