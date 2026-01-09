import { BaseBookData, MonthlyBookClub, MonthlyFieldAndHost } from '@/types';

import ClubTimePlace from '@/components/common/ClubTimePlace';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookField from '@/components/common/book/BookField';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface BasicBookCardProps {
  clubBook: BaseBookData;
  meeting?: MonthlyBookClub['meeting'];
  fieldAndHosts?: MonthlyFieldAndHost;
  className?: string;
}

export default function BasicBookCard({
  clubBook,
  meeting,
  fieldAndHosts,
  className = '',
}: BasicBookCardProps) {
  const { thumbnail, title, url, authors, publisher } = clubBook;

  return (
    <div
      className={`flex w-full gap-x-4 rounded-card bg-white p-5 shadow-card ${className}`}
    >
      <BookThumbnail
        thumbnail={thumbnail}
        title={title}
        iconName={title.includes('이벤트') ? 'MdEventAvailable' : undefined}
        url={url}
        className="w-16"
      />

      <div className="flex w-full flex-col">
        <h1 className="mb-0.5 line-clamp-1 pr-1 font-medium leading-5">
          {title}
        </h1>

        {authors && (
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        )}

        {fieldAndHosts && (
          <div className="mt-2 flex items-center justify-start gap-x-2">
            {fieldAndHosts?.field && <BookField field={fieldAndHosts?.field} />}

            {fieldAndHosts?.hosts.length !== 0 && (
              <ul className="flex gap-x-2">
                {fieldAndHosts?.hosts?.map(host => (
                  <li key={host}>
                    <UserImgName userId={host} size="sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {meeting && (
          <ClubTimePlace
            time={meeting.time}
            place={meeting.place}
            className="mt-2"
          />
        )}
      </div>
    </div>
  );
}
