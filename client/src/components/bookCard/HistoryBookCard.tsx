import { useLocation } from 'react-router-dom';

import { IBookClub } from 'data/bookClubAtom';

import { cutLetter, formatDate } from 'utils';

import Tag from 'components/common/Tag';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';

interface PropsType {
  document: IBookClub;
}

const HistoryBookCard = ({ document }: PropsType) => {
  const { pathname } = useLocation();

  const {
    id,
    book: { thumbnail, title, authors, publisher },
    meeting: { time, place },
  } = document;

  const month = formatDate(id, 'M');

  return (
    <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-between gap-1 rounded-xl border bg-white px-4 py-5 shadow-card">
      {pathname === '/history' && (
        <Tag color="yellow" text={`${month}월의 책`} />
      )}

      <h3 className="my-2 text-center font-semibold">
        {title ? cutLetter(title, 40) : '이벤트'}
      </h3>

      {pathname !== '/history' && !!authors?.length && publisher && (
        <BookAuthorPublisher authors={authors} publisher={publisher} />
      )}

      <div className="h-32">
        <BookThumbnail thumbnail={thumbnail} title={title} />
      </div>

      <span className="mt-3 text-center text-sm">
        {!!time
          ? formatDate(time, 'yyyy.MM.dd a h시 mm분')
          : '정해진 모임 시간이 없습니다.'}
      </span>
      <span className="text-center text-sm">
        {!!place ? place : '정해진 모임 장소가 없습니다.'}
      </span>
    </div>
  );
};

export default HistoryBookCard;
