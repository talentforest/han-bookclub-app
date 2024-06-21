import { ISearchedBook } from 'data/bookAtom';
import { Fragment } from 'react';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import SearchedBookBox from 'components/molecules/SearchedBookBox';
import styled from 'styled-components';

interface Props {
  searchList: ISearchedBook[];
  onSelectBtnClick: (book: ISearchedBook) => void;
}

export default function SearchedBookList({
  searchList,
  onSelectBtnClick,
}: Props) {
  return (
    <BookResults>
      {searchList.map((book, index) => (
        <Fragment key={`${book.title}-${index}`}>
          <SearchedBookBox
            searchedBook={book}
            onSelectBtnClick={onSelectBtnClick}
            modal
          />
          {searchList?.length - 1 !== index && <DottedDividingLine />}
        </Fragment>
      ))}
    </BookResults>
  );
}

const BookResults = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 300px;
  overflow: scroll;
  .no_search {
    display: flex;
    padding-top: 60px;
    justify-content: center;
    height: 100%;
    span {
      font-size: 15px;
      color: ${({ theme }) => theme.text.gray3};
    }
  }
`;
