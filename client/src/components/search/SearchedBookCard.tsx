import { useState } from 'react';

import { ISearchedBook } from 'data/bookAtom';

import { BiChevronDownCircle, BiChevronUpCircle } from 'react-icons/bi';
import { FiLink } from 'react-icons/fi';
import { formatDate } from 'utils';

import FooterBookCard from 'components/bookCard/FooterBookCard';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import RegisterClubBookBtn from 'components/common/button/RegisterClubBookBtn';

interface SearchedBookCardProps {
  searchedBook: ISearchedBook;
}

const SearchedBookCard = ({ searchedBook }: SearchedBookCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  const {
    thumbnail,
    title,
    authors,
    publisher,
    url,
    datetime,
    price,
    contents,
  } = searchedBook;

  return (
    <>
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between gap-1 rounded-xl border px-3 py-2 text-text shadow-card"
      >
        <FooterBookCard
          book={searchedBook}
          className="mr-2 h-14 w-full items-center"
        />
        {isOpen ? (
          <BiChevronUpCircle className="text-lg" />
        ) : (
          <BiChevronDownCircle className="text-lg" />
        )}
      </button>

      <div
        className={`-m-2 overflow-hidden p-2 transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-[450px]' : 'max-h-0'
        }`}
      >
        <div className="mb-4 mt-2 rounded-xl border bg-white p-4 shadow-card [&>img]:float-left [&>img]:mr-4">
          <BookThumbnail thumbnail={thumbnail} title={title} />

          <div className="h-full [&>div]:text-text">
            <h1 className="mb-3 mt-2 text-lg font-medium leading-4">
              {title !== '' ? `《 ${title} 》` : '이벤트'}
            </h1>
            {authors && (
              <BookAuthorPublisher authors={authors} publisher={publisher} />
            )}
            {datetime && (
              <div className="mb-0.5 mt-1.5 text-sm">
                <span className="mr-1 text-gray1">출간일:</span>{' '}
                {formatDate(datetime, 'yyyy년 MM월 dd일')}
              </div>
            )}
            {price && (
              <div className="mb-0.5 text-sm">
                <span className="mr-1 text-gray1">정가:</span>{' '}
                {searchedBook.price.toLocaleString()}원
              </div>
            )}
            {contents && <p className="my-3">{contents}...</p>}

            <div className="flex items-start justify-between">
              {url && (
                <a href={url} target="_blank" rel="noreferrer" className="flex">
                  <FiLink fontSize={12} stroke="#888" />
                  <span className="pl-1 text-sm leading-3 text-gray2">
                    Daum 책정보
                  </span>
                </a>
              )}
              <RegisterClubBookBtn searchedBook={searchedBook} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedBookCard;
