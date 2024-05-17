import { ISearchedBook } from 'data/bookAtom';
import { cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import BookThumbnail from 'components/atoms/BookThumbnail';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface PropsType {
  searchedBook: ISearchedBook;
  modal?: boolean;
  onSelectBtnClick?: (book: ISearchedBook) => void;
}

const SearchedBookBox = ({
  searchedBook,
  modal,
  onSelectBtnClick,
}: PropsType) => {
  const { title, thumbnail, authors, publisher } = searchedBook;

  const bookTitle = title.includes('/') ? title.split('/')[0] : title;

  return (
    <Book
      as={modal ? 'div' : Link}
      $modal={modal}
      to={bookTitle}
      state={{ searchedBook }}
    >
      <BookThumbnail thumbnail={thumbnail} title={title} />

      <BookDetail $modal={modal}>
        <h3>{cutLetter(title, 16)}</h3>
        <BookAuthorPublisher authors={authors} publisher={publisher} />
      </BookDetail>

      {modal && (
        <SelectBtn type='button' onClick={() => onSelectBtnClick(searchedBook)}>
          <FiCheckCircle fontSize={14} stroke='#8bb0ff' />
          <span>선택</span>
        </SelectBtn>
      )}
    </Book>
  );
};

const Book = styled(Link)<{ $modal: boolean }>`
  width: 100%;
  height: ${({ $modal }) => ($modal ? '65px' : '75px')};
  margin-bottom: ${({ $modal }) => ($modal ? '0' : '10px')};
  padding: ${({ $modal }) => ($modal ? '8px 4px' : '8px 10px')};
  display: flex;
  align-items: center;
  background-color: ${({ $modal, theme }) =>
    $modal ? 'transparent' : theme.container.default};
  box-shadow: ${({ $modal, theme }) => ($modal ? 'none' : theme.boxShadow)};
  border-radius: 8px;
  cursor: ${({ $modal }) => ($modal ? 'default' : 'pointer')};
  &:hover {
    background-color: ${({ $modal, theme }) =>
      $modal ? 'transparent' : theme.container.blue1};
  }
  > button {
    place-self: end;
  }
`;

const BookDetail = styled.div<{ $modal: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 12px;
  padding: 2px 0;
  height: 100%;
  flex: 1;
  > h3 {
    font-size: ${({ $modal }) => ($modal ? '14px' : '15px')};
  }
`;

const SelectBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: ${({ theme }) => theme.text.blue3};
    margin-top: 4px;
    font-size: 14px;
  }
`;

export default SearchedBookBox;
