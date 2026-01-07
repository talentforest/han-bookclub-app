import { useLocation } from 'react-router-dom';

import { formatDate } from '@/utils';

import { BookData } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import RegisterClubBookBtn from '@/components/common/button/RegisterClubBookBtn';
import Accordion from '@/components/common/container/Accordion';

interface SearchedBookCardProps {
  searchedBook: BookData;
}

const SearchedBookCard = ({ searchedBook }: SearchedBookCardProps) => {
  const { state } = useLocation() as {
    state: { registerYearMonth: string };
  };

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
      <Accordion
        headerChildren={
          <FooterBookCard
            book={{ thumbnail, title, authors, publisher, url }}
            className="py-4"
          />
        }
      >
        <div className="px-1 pb-4 pt-1">
          <BookThumbnail
            thumbnail={thumbnail}
            title={title}
            url={url}
            className="float-left mb-1 mr-3 w-[72px]"
          />

          <div className="mb-4 h-full [&>div]:text-text">
            <h1 className="mb-1 text-lg font-medium leading-6">
              {title !== '' ? `${title}` : '이벤트'}
            </h1>

            {authors && (
              <BookAuthorPublisher authors={authors} publisher={publisher} />
            )}

            {datetime && (
              <div className="mt-2">
                <span className="mr-1 text-gray1">출간일:</span>{' '}
                <span>{formatDate(datetime, 'yyyy년 M월 d일')}</span>
              </div>
            )}

            {price && (
              <div className="">
                <span className="mr-1 text-gray1">정가:</span>{' '}
                <span>{searchedBook.price.toLocaleString()}원</span>
              </div>
            )}

            {contents && <p className="my-3">{contents}...</p>}
          </div>

          <RegisterClubBookBtn
            searchedBook={{ thumbnail, title, authors, publisher, url }}
            registerYearMonth={state?.registerYearMonth}
          />
        </div>
      </Accordion>
    </>
  );
};

export default SearchedBookCard;
