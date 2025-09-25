import { MouseEvent, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FiUser } from 'react-icons/fi';

import { useRecoilState, useRecoilValue } from 'recoil';

import { allUsersAtom, currAuthUserAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { USER } from '@/appConstants';

interface UserImgNameProps {
  userId: string;
  className?: string;
}

export default function UserImgName({ userId, className }: UserImgNameProps) {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersAtom);

  const user = allUserDocs?.find(({ id }) => id === userId);

  useEffect(() => {
    if (allUserDocs?.length === 0) {
      getCollection(USER, setAllUserDocs);
    }
  }, [userId, allUserDocs, setAllUserDocs]);

  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();

    return false;
  };

  const commonClassName = 'size-[20px] aspect-square rounded-full shadow-card';

  if (!user) return;

  const isCurrentUser = uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return (
    <Link
      to={to}
      state={{ userId: user.id }}
      className={`flex min-w-fit cursor-pointer items-center justify-between gap-x-1 ${className}`}
    >
      {user.photoURL.compressed ? (
        <img
          onContextMenu={onContextMenu}
          src={user.photoURL.compressed}
          alt={`${user.displayName}의 프로필 이미지`}
          className={`aspect-square object-cover ${commonClassName}`}
          width={20}
          height={20}
        />
      ) : (
        <div
          className={`flex items-center justify-center bg-blue3 ${commonClassName}`}
        >
          <FiUser className="size-1/2" stroke="#3c3c3c" />
        </div>
      )}

      <span className="w-full min-w-fit">{user.displayName}</span>
    </Link>
  );
}
