import { ISearchedBook } from 'data/bookAtom';
import { getLocaleDate, cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';

interface PropsType {
  searchedBook: ISearchedBook;
  modal?: boolean;
}

const ResultBookBox = ({ searchedBook, modal }: PropsType) => {
  const { title, thumbnail, authors, publisher, datetime } = searchedBook;

  const bookTitle = title.includes('/') ? title.split('/')[0] : title;

  return (
    <BookResultBoxLink $modal={modal} to={bookTitle} state={{ searchedBook }}>
      <BookThumbnailImg thumbnail={thumbnail} title={title} />
      <div>
        <BookDetail $modal={modal}>
          <h3>{cutLetter(title, 16)}</h3>

          <div>
            <span>
              {authors[0]}
              {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
            </span>
            <span> ・ {publisher}</span>
          </div>
          <span>{getLocaleDate(datetime)}</span>
        </BookDetail>
      </div>
    </BookResultBoxLink>
  );
};

const BookResultBoxLink = styled(Link)<{ $modal: boolean }>`
  width: 100%;
  height: ${({ $modal }) => ($modal ? '60px' : '85px')};
  margin-bottom: ${({ $modal }) => ($modal ? '0' : '10px')};
  display: flex;
  align-items: center;
  padding: ${({ $modal }) => ($modal ? '3px 4px' : '8px 12px')};
  background-color: ${({ $modal, theme }) =>
    $modal ? theme.container.blue1 : theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.container.blue1};
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

  > h3 {
    font-size: ${({ $modal }) => ($modal ? '14px' : '15px')};
  }
  span {
    font-size: ${({ $modal }) => ($modal ? '12px' : '13px')};
    color: #888;
    line-height: 1.4;
  }
`;
export default ResultBookBox;
