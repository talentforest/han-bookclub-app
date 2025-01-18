import { MouseEvent } from 'react';

import { FiUser } from 'react-icons/fi';

interface Props {
  photoURL: string;
  displayName: string;
}

export default function UserImgName({ photoURL, displayName }: Props) {
  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {photoURL ? (
        <img
          onContextMenu={onContextMenu}
          src={photoURL}
          alt={`${displayName}의 프로필 이미지`}
          className="size-48 rounded-full object-cover"
        />
      ) : (
        <div className="rounded-full border bg-white">
          <FiUser fontSize={30} stroke="#aaa" />
        </div>
      )}
      <span className="mt-4">{displayName}</span>
    </div>
  );
}
