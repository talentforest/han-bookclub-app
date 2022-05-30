import { time } from "util/time";
import { BookDocument } from "data/bookAtom";
import styled from "styled-components";

interface PropsType {
  bookInfo: BookDocument[];
}

const BookDescription = ({ bookInfo }: PropsType) => {
  return (
    <Box>
      <ul>
        <li>
          저자:
          {bookInfo[0]?.authors.join(", ")}
        </li>
        {bookInfo[0]?.translators.length !== 0 ? (
          <li>역자: {bookInfo[0]?.translators.join(", ")}</li>
        ) : null}
        <li>출판사: {bookInfo[0]?.publisher}</li>
        <li>정가: {bookInfo[0]?.price}원</li>

        <li>출간일: {time(bookInfo[0]?.datetime)}</li>
      </ul>
      <p>{bookInfo[0]?.contents}...</p>
      <a href={`${bookInfo[0]?.url}`} target="_blank" rel="noreferrer">
        <span>상세정보 보러가기</span>
      </a>
    </Box>
  );
};

const Box = styled.div`
  padding: 0 10px;
  ul {
    margin: 10px 0px 20px;
    li {
      font-size: 13px;
      display: block;
      margin-bottom: 6px;
    }
  }
  p {
    font-size: 13px;
    margin: 5px 0 20px;
    word-break: break-all;
    line-height: 20px;
  }
  a {
    span {
      font-size: 12px;
      color: ${(props) => props.theme.text.accent};
      text-decoration: underline;
    }
  }
`;

export default BookDescription;
