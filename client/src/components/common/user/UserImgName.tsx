import { MouseEvent } from 'react';

import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { baseProfileImgAtom, userAtomFamily } from '@/data/userAtom';
import { currAuthUserAtom } from '@/data/userAtom';

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
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { status, data: user } = useRecoilValue(userAtomFamily(userId));

  const { status: isBasePhotoLoading, data: basePhoto } =
    useRecoilValue(baseProfileImgAtom);

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

  const commonClassName = 'aspect-square object-cover rounded-full shadow-card';

  if (isBasePhotoLoading === 'loaded' && !user) {
    return (
      <div
        className={`flex min-w-fit items-center justify-between gap-x-1 opacity-70 ${sizeStyle[size]} ${className}`}
      >
        <img
          onContextMenu={onContextMenu}
          src={basePhoto.baseProfileImg}
          alt="앱 기본 이미지"
          className={commonClassName}
        />
        <span className="min-w-fit">탈퇴회원</span>
      </div>
    );
  }

  const isCurrentUser = uid === user?.id;
  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return (
    status === 'loaded' &&
    isBasePhotoLoading === 'loaded' && (
      <>
        {!isLink && (
          <div
            className={`flex min-w-fit items-center justify-between gap-x-1 ${sizeStyle[size]} ${className}`}
          >
            <img
              onContextMenu={onContextMenu}
              src={user.photoURL.compressed || basePhoto.baseProfileImg}
              alt={`${user.displayName}의 프로필 이미지`}
              className={commonClassName}
            />
            <span className="min-w-fit">{user.displayName}</span>
          </div>
        )}

        {isLink && (
          <Link
            to={to}
            state={{ userId: user.id }}
            className={`flex min-w-fit cursor-pointer items-center justify-between gap-x-1 ${sizeStyle[size]} ${className}`}
          >
            <img
              onContextMenu={onContextMenu}
              src={user.photoURL.compressed || basePhoto.baseProfileImg}
              alt={`${user.displayName}의 프로필 이미지`}
              className={commonClassName}
            />
            <span className="min-w-fit">{user.displayName}</span>
          </Link>
        )}
      </>
    )
  );
}
