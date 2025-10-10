import { FiBook } from 'react-icons/fi';
import { MdEventAvailable } from 'react-icons/md';

import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';

interface BookThumbnailProps {
  title: string;
  thumbnail: string;
  url?: string;
  className?: string;
}

export default function BookThumbnail({
  title,
  thumbnail,
  url,
  className = '',
}: BookThumbnailProps) {
  const commonClassName =
    'flex aspect-[0.68/1] h-full items-center justify-center rounded-l-none rounded-r-lg border border-gray4 bg-gray1 shadow-book';

  return (
    <>
      {thumbnail !== '' &&
        (url ? (
          <div className={`relative ${className}`}>
            <img
              className={`${commonClassName}`}
              src={thumbnail}
              alt={`${title} 북커버`}
            />
            <ExternalLinkBtn
              url={url}
              className="absolute bottom-0.5 right-0.5 flex size-8 items-center justify-center rounded-full bg-indigo-500 text-white opacity-60"
            />
          </div>
        ) : (
          <img
            className={`${commonClassName} ${className}`}
            src={thumbnail}
            alt={`${title} 북커버`}
          />
        ))}

      {thumbnail === '' && (
        <div className={`${commonClassName} ${className}`}>
          {title.includes('이벤트') ? (
            <MdEventAvailable className="size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-1/2" />
          ) : (
            <FiBook className="size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-2/3" />
          )}
        </div>
      )}
    </>
  );
}
