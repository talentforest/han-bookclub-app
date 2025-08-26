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
  return (
    <>
      {thumbnail !== '' && (
        <img
          className={`flex aspect-[0.68/1] h-full max-h-40 items-center justify-center rounded-md bg-gray1 shadow-book ${className}`}
          src={thumbnail}
          alt={`${title} 북커버`}
        />
      )}

      {thumbnail === '' && (
        <div
          className={`flex aspect-[0.68/1] h-full max-h-40 items-center justify-center rounded-md bg-white shadow-book ${className}`}
        >
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
