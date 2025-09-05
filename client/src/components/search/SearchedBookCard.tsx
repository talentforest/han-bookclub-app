import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { BiChevronDownCircle, BiChevronUpCircle } from 'react-icons/bi';

import { formatDate } from '@/utils';

import { BookData } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import RegisterClubBookBtn from '@/components/common/button/RegisterClubBookBtn';

interface SearchedBookCardProps {
  searchedBook: BookData;
}

const SearchedBookCard = ({ searchedBook }: SearchedBookCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useLocation() as {
    state: { registerYearMonth: string };
  };

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

  const iconStyle = 'size-5 w-[10%] text-gray1';

  return (
    <>
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between gap-1 rounded-xl bg-white px-3 py-2 text-text shadow-card"
      >
        <FooterBookCard
          book={searchedBook}
          className="mr-1 h-14 w-[90%] items-center"
        />

        {isOpen ? (
          <BiChevronUpCircle className={iconStyle} />
        ) : (
          <BiChevronDownCircle className={iconStyle} />
        )}
      </button>

      <div
        className={`-m-2 overflow-hidden p-2 transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div
          className={`mb-4 mt-2 rounded-xl bg-white p-4 shadow-card ${thumbnail === '' ? '[&>div:first-child]:float-left [&>div:first-child]:mr-3 [&>div:first-child]:w-28' : '[&>img]:float-left [&>img]:mr-3 [&>img]:w-28'}`}
        >
          <BookThumbnail thumbnail={thumbnail} title={title} />

          <div className="mb-4 h-full [&>div]:text-text">
            <h1 className="mb-1 text-lg font-medium">
              {title !== '' ? `《 ${title} 》` : '이벤트'}
            </h1>
            {authors && (
              <BookAuthorPublisher authors={authors} publisher={publisher} />
            )}
            {datetime && (
              <div className="mb-0.5 mt-3">
                <span className="mr-1 text-gray1">출간일:</span>{' '}
                {formatDate(datetime, 'yyyy년 MM월 dd일')}
              </div>
            )}
            {price && (
              <div className="mb-0.5">
                <span className="mr-1 text-gray1">정가:</span>{' '}
                {searchedBook.price.toLocaleString()}원
              </div>
            )}
            {contents && <p className="my-3">{contents}...</p>}

            {url && <ExternalLinkBtn title="Daum 책정보" url={url} />}
          </div>

          <RegisterClubBookBtn
            searchedBook={searchedBook}
            registerYearMonth={state?.registerYearMonth}
          />
        </div>
      </div>
    </>
  );
};

export default SearchedBookCard;
