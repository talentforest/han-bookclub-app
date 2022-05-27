import { Book } from "@mui/icons-material";
import { BookDocument } from "data/bookAtom";
import { Time } from "util/Time";
import styled from "styled-components";

interface PropsType {
  bookInfo: BookDocument;
}

const ResultBox = ({ bookInfo }: PropsType) => {
  return (
    <BookResultBox>
      {bookInfo?.thumbnail ? (
        <img src={bookInfo.thumbnail} alt="Book_Image" />
      ) : (
        <div>
          <Book />
        </div>
      )}
      <BookDetail>
        <h3>
          {bookInfo.title.length > 15
            ? `${bookInfo.title.slice(0, 15)}...`
            : bookInfo.title}
        </h3>
        <span>저자: {bookInfo.authors}</span>
        {bookInfo?.translators.length !== 0 ? (
          <span>역자: {bookInfo.translators}</span>
        ) : (
          <></>
        )}
        <span>출판사: {bookInfo.publisher}</span>
        <span>출간일: {Time(bookInfo.datetime)}</span>
        <a href={`${bookInfo.url}`} target="_blank" rel="noreferrer">
          <span>상세정보 보러가기</span>
        </a>
      </BookDetail>
    </BookResultBox>
  );
};

const BookResultBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px 15px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-bottom: 10px;
  img {
    width: auto;
    height: 100px;
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
  font-size: 13px;
  margin-bottom: 15px;
  margin-left: 20px;
  > h3 {
    font-weight: 700;
    margin-bottom: 6px;
  }
  > span {
    font-size: 12px;
  }
  > a {
    position: absolute;
    right: 10px;
    bottom: 5px;
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

export default ResultBox;
