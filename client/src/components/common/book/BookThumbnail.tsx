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
    'aspect-[0.68/1] h-fit shadow-book overflow-hidden rounded-r-lg';

  return (
    <>
      {thumbnail !== '' && (
        <div className={`relative ${commonClassName} ${className}`}>
          <img className="size-full" src={thumbnail} alt={`${title} 북커버`} />
          {url && (
            <ExternalLinkBtn
              url={url}
              className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full bg-indigo-500 text-white opacity-50"
            />
          )}
        </div>
      )}

      {thumbnail === '' && (
        <div
          className={`flex items-center justify-center bg-gray4 ${commonClassName} ${className}`}
        >
          {title.includes('이벤트') ? (
            <MdEventAvailable className="size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-1/2" />
          ) : (
            <FiBook className="mx-auto size-full max-h-[40px] max-w-[40px] text-gray2 max-sm:w-1/2" />
          )}
        </div>
      )}
    </>
  );
}
