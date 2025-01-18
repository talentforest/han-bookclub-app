import { FaPeopleRoof } from 'react-icons/fa6';
import { FiBook } from 'react-icons/fi';

interface Props {
  title: string;
  thumbnail: string;
}

export default function BookThumbnail({ title, thumbnail }: Props) {
  return (
    <>
      {thumbnail !== '' ? (
        <img
          className="flex aspect-[0.68/1] h-full items-center justify-center rounded-md bg-gray1 shadow-card"
          src={thumbnail}
          alt={`${title} 북커버`}
        />
      ) : (
        <div className="flex aspect-[0.68/1] h-full items-center justify-center rounded-md bg-white shadow-card">
          {thumbnail === '' ? (
            <FaPeopleRoof className="size-full max-h-[34px] max-w-[34px] text-green2" />
          ) : (
            <FiBook className="size-full max-h-[40px] max-w-[40px] text-gray2" />
          )}
        </div>
      )}
    </>
  );
}
