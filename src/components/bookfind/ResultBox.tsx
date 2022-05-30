import { Book } from "@mui/icons-material";
import { BookDocument } from "data/bookAtom";
import { time } from "util/time";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

interface PropsType {
  bookInfo: BookDocument;
}

const ResultBox = ({ bookInfo }: PropsType) => {
  return (
    <>
      <BookResultBox as={Link} to={{ pathname: `${bookInfo.title}` }}>
        {bookInfo?.thumbnail ? (
          <img src={bookInfo.thumbnail} alt="Book_Image" />
        ) : (
          <div>
            <Book />
          </div>
        )}
        <BookDetail>
          <h3>
            {bookInfo.title.length > 17
              ? `${bookInfo.title.slice(0, 17)}...`
              : bookInfo.title}
          </h3>
          <span>저자: {bookInfo.authors}</span>
          {bookInfo?.translators.length !== 0 ? (
            <span>역자: {bookInfo.translators}</span>
          ) : (
            <></>
          )}
          <span>출판사: {bookInfo.publisher}</span>
          <span>출간일: {time(bookInfo.datetime)}</span>
        </BookDetail>
      </BookResultBox>
      <Outlet />
    </>
  );
};

const BookResultBox = styled.div`
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
    height: 65px;
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
  font-size: 12px;
  margin-left: 20px;
  > h3 {
    font-weight: 700;
    margin-bottom: 3px;
  }
  > span {
    font-size: 11px;
  }
`;
export default ResultBox;