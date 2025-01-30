import { useNavigate } from 'react-router-dom';

import { ISearchedBook } from 'data/bookAtom';

import { FiChevronRight } from 'react-icons/fi';
import { thisMonth } from 'utils';

import ExternalLinkBtn from 'components/common/ExternalLinkBtn';
import Tag from 'components/common/Tag';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';

interface Props {
  month: string;
  book: ISearchedBook;
  bookFields: string;
  className?: string;
}

export default function MonthBookCard({
  month,
  book,
  bookFields,
  className = '',
}: Props) {
  const { title, thumbnail, authors, publisher, url } = book;

  const navigate = useNavigate();

  return (
    <div
      className={`flex h-full justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-card max-sm:gap-2 max-sm:p-3 ${className}`}
    >
      <div className="flex flex-col items-start justify-between max-sm:w-[60%]">
        <Tag
          text={`${month}월 모임책`}
          color={+month === +thisMonth ? 'lightGreen' : 'purple'}
          shape="rounded"
          className="font-medium shadow-2xl"
        />
        {title === '' ? (
          <>
            <span className="mt-1 text-lg">아직 등록된 책이 없어요.</span>
            <div className="flex items-center pt-2.5">
              <button
                onClick={() => navigate('/search')}
                className="text-gray3"
              >
                책 등록하러 가기
              </button>
              <FiChevronRight fontSize={16} color="#aaa" />
            </div>
          </>
        ) : (
          <div className="mt-1 flex h-full w-full flex-1 flex-col justify-between pl-1">
            <h1 className="mb-1.5 mt-2 line-clamp-2 w-full text-lg font-medium leading-6">
              {title}
            </h1>
            <BookAuthorPublisher authors={authors} publisher={publisher} />
            <span className="mb-2 mt-0.5 flex-1 text-gray2">
              {bookFields}분야
            </span>
            <ExternalLinkBtn title="책 상세정보 보러가기" url={url} />
          </div>
        )}
      </div>

      <BookThumbnail title={title} thumbnail={thumbnail} />
    </div>
  );
}
