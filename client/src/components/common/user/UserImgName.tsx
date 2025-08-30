import { MouseEvent } from 'react';

import { FiUser } from 'react-icons/fi';

interface UserImgNameProps {
  photoURL: string;
  displayName: string;
}

export default function UserImgName({
  photoURL,
  displayName,
}: UserImgNameProps) {
  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const className = 'size-40 rounded-full bg-white shadow-card';

  return (
    <div className="flex flex-col items-center justify-between">
      {photoURL ? (
        <img
          onContextMenu={onContextMenu}
          src={photoURL}
          alt={`${displayName}의 프로필 이미지`}
          className={`object-cover ${className}`}
        />
      ) : (
        <div className={`flex items-center justify-center ${className}`}>
          <FiUser className="size-1/2" stroke="#aaa" />
        </div>
      )}
      <span className="mt-4">{displayName}</span>
    </div>
  );
}
