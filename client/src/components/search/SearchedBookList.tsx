import { Fragment } from 'react';

import { ISearchedBook } from 'data/bookAtom';

import { FiCheckCircle } from 'react-icons/fi';

import FooterBookCard from 'components/bookCard/FooterBookCard';
import DottedDividingLine from 'components/common/DottedDividingLine';

interface Props {
  searchList: ISearchedBook[];
  onSelectBtnClick: (book: ISearchedBook) => void;
}

export default function SearchedBookList({
  searchList,
  onSelectBtnClick,
}: Props) {
  return (
    <ul className="mt-4 h-64 overflow-scroll">
      {searchList.map((book, index) => (
        <Fragment key={`${book.title}-${book.isbn}`}>
          <li className="relative py-2">
            <FooterBookCard book={book} className="h-14" />
            <button
              type="button"
              onClick={() => onSelectBtnClick(book)}
              className="absolute bottom-2 right-0 flex items-center gap-1"
            >
              <FiCheckCircle className="text-sm text-blue1" />
              <span className="mt-1 text-sm text-blue1">선택</span>
            </button>
          </li>

          {searchList?.length - 1 !== index && <DottedDividingLine />}
        </Fragment>
      ))}
    </ul>
  );
}
