import { Book } from "@mui/icons-material";
import { IBookApi } from "data/bookAtom";
import { timestamp } from "util/timestamp";
import { Link } from "react-router-dom";
import { cutLetter } from "util/cutLetter";
import styled from "styled-components";

interface PropsType {
  searchedBook: IBookApi;
}

const ResultBox = ({ searchedBook }: PropsType) => {
  const { title, thumbnail, authors, translators, publisher, datetime } =
    searchedBook;
  const bookTitle = title.includes("/") ? title.split("/")[0] : title;

  return (
    <>
      <BookResultBox to={`${bookTitle}`} state={{ searchedBook }}>
        {thumbnail ? (
          <img src={thumbnail} alt={`${thumbnail} book`} />
        ) : (
          <div>
            <Book />
          </div>
        )}
        <BookDetail>
          <h3>{cutLetter(title, 17)}</h3>
          <span>저자: {authors.join(", ")}</span>
          {translators.length !== 0 && <span>역자: {translators}</span>}
          <span>출판사: {publisher}</span>
          <span>출간일: {timestamp(datetime)}</span>
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
  padding: 8px 20px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  img {
    width: auto;
    height: 80px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  }
  > div:first-child {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.container.lightBlue};
    height: 100px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 30px;
      height: 30px;
    }
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
