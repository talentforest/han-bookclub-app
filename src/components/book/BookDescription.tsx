import { useEffect, useState } from "react";
import { Time } from "util/Time";
import { bookSearch } from "api/api";
import { bookDescState } from "data/bookAtom";
import { useRecoilState } from "recoil";
import Subtitle from "components/common/Subtitle";
import BookImage from "./BookImage";
import styled from "styled-components";

const BookDescription = () => {
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);
  const [bookQuery, setBookQuery] = useState(bookInfo.title);

  useEffect(() => {
    if (bookInfo.title === "") {
      bookSearchHandler(bookQuery, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이달의 책 정보를 firebase에 저장하기

  const bookSearchHandler = async (query: string, reset: boolean) => {
    const params = {
      query: bookQuery,
    };
    const { data } = await bookSearch(params);
    setBookInfo({
      title: data.documents[0].title,
      authors: data.documents[0].authors,
      translators: data.documents[0].translators,
      publisher: data.documents[0].publisher,
      datetime: data.documents[0].datetime,
      contents: data.documents[0].contents,
      thumbnail: data.documents[0].thumbnail,
      url: data.documents[0].url,
    });
  };

  return (
    <>
      <BookImage />
      <Box>
        <Subtitle title="도서 정보" />
        <p>{bookInfo.contents}...</p>
        <ul>
          <li>저자: {bookInfo.authors}</li>
          <li>출판사: {bookInfo.publisher}</li>
          <li>출간일: {Time(bookInfo.datetime)}</li>
        </ul>
        <a href={`${bookInfo.url}`} target="_blank" rel="noreferrer">
          <span>상세정보 보러가기</span>
        </a>
      </Box>
    </>
  );
};

const Box = styled.div`
  padding: 0px 10px;
  margin-top: 20px;
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
