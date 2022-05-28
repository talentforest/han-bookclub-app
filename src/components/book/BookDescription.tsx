import { useEffect } from "react";
import { Time } from "util/Time";
import { bookSearchHandler } from "api/api";
import { bookDescState } from "data/bookAtom";
import { useRecoilState } from "recoil";
import Subtitle from "components/common/Subtitle";
import BookImage from "./BookImage";
import styled from "styled-components";

const BookDescription = () => {
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);

  useEffect(() => {
    if (bookInfo[0]?.title === "") {
      bookSearchHandler(bookInfo[0]?.title, true, setBookInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BookImage />
      <Box>
        <Subtitle title="도서 정보" />
        <p>{bookInfo[0]?.contents}...</p>
        <ul>
          <li>저자: {bookInfo[0]?.authors}</li>
          <li>출판사: {bookInfo[0]?.publisher}</li>
          <li>출간일: {Time(bookInfo[0]?.datetime)}</li>
        </ul>
        <a href={`${bookInfo[0]?.url}`} target="_blank" rel="noreferrer">
          <span>상세정보 보러가기</span>
        </a>
      </Box>
    </>
  );
};

const Box = styled.div`
  padding: 0px 10px;
  margin: 20px 0 40px;
  > h1:first-child {
    margin: 0;
    border-bottom: 1px solid #c5c5c5;
    display: block;
    width: 100%;
    font-size: 14px;
    padding-bottom: 5px;
  }
  p {
    font-size: 13px;
    margin: 5px 0;
    word-break: break-all;
    line-height: 20px;
  }
  ul {
    margin: 20px 0 10px;
    li {
      font-size: 12px;
      display: block;
      margin: 3px 0 0;
    }
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
