import { IBookApi } from 'data/bookAtom';
import { getLocalDate, cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PropsType {
  searchedBook: IBookApi;
}

const ResultBox = ({ searchedBook }: PropsType) => {
  const { title, thumbnail, authors, translators, publisher, datetime } =
    searchedBook;
  const bookTitle = title.includes('/') ? title.split('/')[0] : title;

  return (
    <>
      <BookResultBox to={`${bookTitle}`} state={{ searchedBook }}>
        {thumbnail ? (
          <SearchImg src={thumbnail} alt={`${thumbnail} book`} />
        ) : (
          <SearchEmptyImg as='div'></SearchEmptyImg>
        )}
        <BookDetail>
          <h3>{cutLetter(title, 16)}</h3>
          <span>저자: {authors.join(', ')}</span>
          {translators.length !== 0 && <span>역자: {translators}</span>}
          <span>출판사: {publisher}</span>
          <span>출간일: {getLocalDate(datetime)}</span>
        </BookDetail>
      </BookResultBox>
    </>
  );
};

const BookResultBox = styled(Link)`
  position: relative;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  img {
    width: auto;
    height: 80px;
    box-shadow: ${(props) => props.theme.boxShadow};
  }
  > div:first-child {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;
const SearchImg = styled.img`
  width: auto;
  height: 80px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const SearchEmptyImg = styled(SearchImg)`
  background-color: ${(props) => props.theme.container.lightBlue};
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
  }
`;
const BookDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 20px;
  > h3 {
    font-weight: 700;
    margin-bottom: 3px;
  }
  > span {
    font-size: 14px;
  }
`;
export default ResultBox;
