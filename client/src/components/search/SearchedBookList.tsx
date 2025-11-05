import { Fragment } from 'react';

import { FiCheckCircle } from 'react-icons/fi';

import { BookData } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import DottedDividingLine from '@/components/common/DottedDividingLine';

interface SearchedBookListProps {
  searchList: BookData[];
  onSelectBtnClick: (book: BookData) => void;
}

export default function SearchedBookList({
  searchList,
  onSelectBtnClick,
}: SearchedBookListProps) {
  return (
    <ul className="mt-2 h-64 overflow-scroll">
      {searchList.map((book, index) => (
        <Fragment key={`${book.title}-${book.isbn}`}>
          <li className="py-2">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-x-2"
              onClick={() => onSelectBtnClick(book)}
            >
              <FooterBookCard book={book} className="h-14" />
              <FiCheckCircle className="text-lg text-blue1" />
            </button>
          </li>

          {searchList?.length - 1 !== index && <DottedDividingLine />}
        </Fragment>
      ))}
    </ul>
  );
}
