import { Link, useLocation, useMatch } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { FiArchive, FiCoffee, FiHome, FiUser } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

const BottomNavigation = () => {
  const currentUser = useRecoilValue(currentUserState);

  const { pathname } = useLocation();

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const bookShelfMatch = useMatch('/bookshelf/:id');

  const navigationList = [
    {
      name: '홈',
      to: '/',
      icon: <FiHome className="text-sm" />,
    },
    {
      name: '지난 모임',
      to: '/history',
      icon: <FiArchive className="text-sm" />,
    },
    {
      name: '이달의 모임',
      to: '/bookclub',
      icon: <FiCoffee className="text-sm" />,
    },
    {
      name: '투표하기',
      to: '/vote',
      icon: <MdOutlineHowToVote className="text-sm" />,
    },
    {
      name: '나의 책장',
      to: '/bookshelf',
      icon: <FiUser className="text-sm" />,
    },
  ];

  return (
    pathname !== '/login' &&
    !bookShelfMatch &&
    !pathname.includes('setting') &&
    !pathname.includes('userInfo') && (
      <nav className="fixed bottom-0 left-0 z-10 hidden w-full bg-white pb-1 pt-2 sm:block">
        <ul className="flex justify-evenly">
          {navigationList.map(({ to, name, icon }) => (
            <li
              key={to}
              className={`flex w-[20%] cursor-pointer flex-col items-center justify-center text-[10px] ${pathname === to ? 'text-text' : 'text-gray2'}`}
            >
              <Link
                to={to}
                state={
                  to === '/bookshelf' ? { userId: currentUser.uid } : undefined
                }
                onClick={
                  to === '/bookshelf' ? blockLinkAndAlertJoinMember : undefined
                }
                className="flex flex-col items-center justify-center gap-1"
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
