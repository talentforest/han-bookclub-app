import { IBookClub } from 'data/bookClubAtom';

import { FiLink } from 'react-icons/fi';
import { formatDate } from 'utils';

import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';

interface BasicBookCardProps {
  bookClub: IBookClub;
  className?: string;
}

export default function BasicBookCard({
  bookClub,
  className = '',
}: BasicBookCardProps) {
  const {
    meeting: { place, time },
    book: { thumbnail, title, authors, publisher, url },
  } = bookClub;

  return (
    <div
      className={`flex h-40 items-center rounded-xl border bg-white p-4 shadow-card ${className}`}
    >
      <BookThumbnail thumbnail={thumbnail} title={title} />

      <div className="ml-4 flex h-full flex-col">
        <h1 className="my-2 line-clamp-1 text-lg font-medium leading-4">
          {title !== '' ? title : '이벤트'}
        </h1>
        {authors && (
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        )}

        <span className="mt-2 text-sm">
          {formatDate(time, 'yyyy.MM.dd a h시 mm분')}
        </span>
        <span className="mt-1 text-sm">{place}</span>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-auto flex items-center gap-0.5"
          >
            <FiLink fontSize={12} stroke="#888" />
            <span className="text-sm leading-3 text-gray2">
              Daum 책정보 보러가기
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
