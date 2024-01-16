import { IBookApi } from 'data/bookAtom';
import { getLocalDate, cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import RegisterRecommendButton from './RegisterRecommendButton';

interface PropsType {
  searchedBook: IBookApi;
  modal?: boolean;
}

const ResultBookBox = ({ searchedBook, modal }: PropsType) => {
  const { title, thumbnail, authors, publisher, datetime } = searchedBook;

  const bookTitle = title.includes('/') ? title.split('/')[0] : title;

  return (
    <BookResultBox $modal={modal} to={bookTitle} state={{ searchedBook }}>
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
          <span>{getLocalDate(datetime)}</span>
        </BookDetail>
      </div>
    </BookResultBox>
    // <RegisterRecommendButton searchedBook={searchedBook} />
  );
};

const BookResultBox = styled(Link)<{ $modal: boolean }>`
  width: 100%;
  height: ${(props) => (props.$modal ? '60px' : '85px')};
  margin-bottom: ${(props) => (props.$modal ? '0' : '10px')};
  display: flex;
  align-items: center;
  padding: ${(props) => (props.$modal ? '3px 4px' : '8px 12px')};
  background-color: ${(props) =>
    props.$modal
      ? props.theme.container.lightBlue
      : props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  > button {
    border: 1px solid red;
    place-self: end;
  }
`;

const BookDetail = styled.div<{ $modal: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 12px;

  > h3 {
    font-size: ${(props) => (props.$modal ? '14px' : '15px')};
  }
  span {
    font-size: ${(props) => (props.$modal ? '12px' : '13px')};
    color: #888;
    line-height: 1.4;
  }
`;
export default ResultBookBox;
