import { ReactNode } from 'react';

import { FiBook, FiPlus } from 'react-icons/fi';
import { MdEventAvailable } from 'react-icons/md';

import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';

interface BookThumbnailProps {
  title?: string;
  thumbnail?: string;
  url?: string;
  className?: string;
  iconName?: 'MdEventAvailable' | 'FiPlus';
}

export default function BookThumbnail({
  title,
  thumbnail,
  url,
  className = '',
  iconName,
}: BookThumbnailProps) {
  const icon: { [key in BookThumbnailProps['iconName']]: ReactNode } = {
    MdEventAvailable: (
      <MdEventAvailable className="mx-auto size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-1/2" />
    ),
    FiPlus: (
      <FiPlus className="mx-auto size-full max-h-[40px] max-w-[40px] text-blue2 max-sm:w-[55%]" />
    ),
  };

  const commonClassName = 'aspect-[0.68/1] shadow-book h-fit rounded-r-[8%]';

  return (
    <>
      {thumbnail && (
        <div className={`relative h-fit ${className}`}>
          <img
            className={`size-full ${commonClassName} `}
            src={thumbnail}
            alt={`${title} 북커버`}
          />
          {url && (
            <ExternalLinkBtn
              url={url}
              className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full bg-indigo-500 text-white opacity-50"
            />
          )}
        </div>
      )}

      {!thumbnail && (
        <div
          className={`flex h-fit items-center justify-center bg-gray4 ${commonClassName} ${className}`}
        >
          {iconName ? (
            icon[iconName]
          ) : (
            <FiBook className="mx-auto size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-1/2" />
          )}
        </div>
      )}
    </>
  );
}
