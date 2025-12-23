import { FiUser } from 'react-icons/fi';

import { MonthlyBookClub, MonthlyFieldAndHost } from '@/types';

import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookField from '@/components/common/book/BookField';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface BasicBookCardProps {
  bookClub: MonthlyBookClub;
  fieldAndHosts?: MonthlyFieldAndHost;
  className?: string;
}

export default function BasicBookCard({
  bookClub,
  fieldAndHosts,
  className = '',
}: BasicBookCardProps) {
  const { book } = bookClub;

  return (
    <div
      className={`flex gap-x-4 rounded-card bg-white p-5 shadow-card ${className}`}
    >
      <BookThumbnail
        thumbnail={book.thumbnail}
        title={book.title}
        iconName={
          book.title.includes('이벤트') ? 'MdEventAvailable' : undefined
        }
        url={book.url}
        className="w-28"
      />

      <div className="flex w-full flex-col justify-between">
        <h1 className="mb-1 line-clamp-2 pr-1 text-lg font-medium leading-5">
          {book.title}
        </h1>

        {book.authors && (
          <BookAuthorPublisher
            authors={book.authors}
            publisher={book.publisher}
          />
        )}

        {fieldAndHosts?.field && <BookField field={fieldAndHosts?.field} />}

        <div className="flex items-center gap-x-1">
          <FiUser className="text-[16px] text-purple2" />
          <ul className="flex gap-x-2">
            {fieldAndHosts?.hosts?.map(host => (
              <li key={host}>
                <UserImgName userId={host} className="text-[15px]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
