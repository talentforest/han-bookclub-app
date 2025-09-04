import { FiBook } from 'react-icons/fi';
import { MdEventAvailable } from 'react-icons/md';

interface BookThumbnailProps {
  title: string;
  thumbnail: string;
  className?: string;
}

export default function BookThumbnail({
  title,
  thumbnail,
  className = '',
}: BookThumbnailProps) {
  const commonClassName =
    'flex aspect-[0.68/1] h-full items-center justify-center rounded-l-none rounded-r-lg border border-gray4 bg-gray1 shadow-book';

  return (
    <>
      {thumbnail !== '' && (
        <img
          className={`${commonClassName} ${className}`}
          src={thumbnail}
          alt={`${title} 북커버`}
        />
      )}

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
