import { MouseEvent } from 'react';

import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { basePhotoAtom } from '@/data/clubAtom';
import { currAuthUserAtom, userListAtom } from '@/data/userAtom';

interface UserImgNameProps {
  userId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isLink?: boolean;
}

export default function UserImgName({
  userId,
  className,
  size = 'md',
  isLink = true,
}: UserImgNameProps) {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const basePhoto = useRecoilValue(basePhotoAtom);

  const { data: allUserDocs } = useRecoilValue(userListAtom);

  const user = allUserDocs?.find(({ id }) => id === userId);

  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const sizeStyle = {
    sm: 'text-sm  [&>img]:size-[18px]',
    md: 'text-base [&>img]:size-[20px]',
    lg: 'text-lg [&>img]:size-[22px]',
  };

  const commonClassName = 'aspect-square rounded-full shadow-card';

  if (!user)
    return (
      <span className={`${sizeStyle[size]} ${className} text-gray2`}>
        탈퇴회원
      </span>
    );

  const isCurrentUser = uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return isLink ? (
    <Link
      to={to}
      state={{ userId: user.id }}
      className={`flex min-w-fit cursor-pointer items-center justify-between gap-x-1 ${sizeStyle[size]} ${className}`}
    >
      <img
        onContextMenu={onContextMenu}
        src={user.photoURL.compressed || basePhoto}
        alt={`${user.displayName}의 프로필 이미지`}
        className={`aspect-square object-cover ${commonClassName}`}
      />

      <span className="min-w-fit">{user.displayName}</span>
    </Link>
  ) : (
    <div
      className={`flex min-w-fit items-center justify-between gap-x-1 ${sizeStyle[size]} ${className}`}
    >
      <img
        onContextMenu={onContextMenu}
        src={user.photoURL.compressed || basePhoto}
        alt={`${user.displayName}의 프로필 이미지`}
        className={`aspect-square object-cover ${commonClassName}`}
      />

      <span className="min-w-fit">{user.displayName}</span>
    </div>
  );
}
