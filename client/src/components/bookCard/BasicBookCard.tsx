import { IBookClub } from 'data/bookClubAtom';

import { formatDate } from 'utils';

import ExternalLinkBtn from 'components/common/ExternalLinkBtn';
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
      className={`rounded-xl border bg-white p-4 shadow-card ${thumbnail === '' ? '[&>div:first-child]:float-left [&>div:first-child]:mr-3 [&>div:first-child]:h-20' : '[&>img]:float-left [&>img]:mr-3 [&>img]:h-28'} ${className}`}
    >
      <BookThumbnail thumbnail={thumbnail} title={title} />

      <div>
        <h1 className="line-clamp-1 text-lg font-medium">
          <span className="pr-1">{title}</span>
          {url && <ExternalLinkBtn url={url} />}
        </h1>

        {authors && (
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        )}

        <span className="mt-1.5 block">
          {formatDate(time, 'yyyy.MM.dd a h시 mm분')}
        </span>
        <span className="mb-2 mt-1">{place}</span>
      </div>
    </div>
  );
}
