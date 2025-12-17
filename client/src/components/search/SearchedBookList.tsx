import { Fragment } from 'react';

import { FiCheckCircle } from 'react-icons/fi';

import { BaseBookData, BookData } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import DottedDividingLine from '@/components/common/DottedDividingLine';

interface SearchedBookListProps {
  searchList: BookData[];
  onSelectBtnClick: (book: BaseBookData) => void;
}

export default function SearchedBookList({
  searchList,
  onSelectBtnClick,
}: SearchedBookListProps) {
  return (
    <ul className="mt-2 h-64 overflow-scroll">
      {searchList.map(
        ({ isbn, title, thumbnail, authors, publisher, url }, index) => (
          <Fragment key={`${title}-${isbn}`}>
            <li className="py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-x-2"
                onClick={() =>
                  onSelectBtnClick({
                    title,
                    thumbnail,
                    authors,
                    publisher,
                    url,
                  })
                }
              >
                <FooterBookCard
                  book={{ title, thumbnail, authors, publisher, url }}
                  className="h-14"
                />
                <FiCheckCircle className="text-lg text-blue1" />
              </button>
            </li>

            {searchList?.length - 1 !== index && <DottedDividingLine />}
          </Fragment>
        ),
      )}
    </ul>
  );
}
