import { useNavigate } from 'react-router-dom';

import { ISearchedBook } from 'data/bookAtom';

import { FiChevronRight, FiLink } from 'react-icons/fi';
import { thisMonth } from 'utils';

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
      className={`flex items-center justify-between gap-4 rounded-xl border bg-[#fff] px-5 py-4 shadow-card sm:p-3 ${className}`}
    >
      <div className="flex h-full w-full flex-1 flex-col items-start justify-between truncate">
        <Tag
          text={`${month}월 모임`}
          color={+month === +thisMonth ? 'blue' : 'purple'}
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
          <div className="mt-1 flex w-full flex-1 flex-col justify-between pl-1">
            <h1 className="my-2 w-full truncate text-lg font-medium leading-6">
              {title}
            </h1>

            <BookAuthorPublisher authors={authors} publisher={publisher} />

            <Tag
              text={bookFields}
              className="mb-4 mt-2 !px-2 !py-1 !text-xs"
              shape="square"
              color="green"
            />
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto flex items-center gap-0.5"
            >
              <FiLink fontSize={12} stroke="#888" />
              <span className="text-sm leading-3 text-gray2">
                책 상세정보 보러가기
              </span>
            </a>
          </div>
        )}
      </div>
      <BookThumbnail title={title} thumbnail={thumbnail} />
    </div>
  );
}
