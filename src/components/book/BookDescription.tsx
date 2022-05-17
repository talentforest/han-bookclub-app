import { useEffect, useState } from "react";
import { BookInfo } from "theme/commonStyle";
import { bookSearch } from "api/api";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";

const BookDescription = () => {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    authors: [],
    translator: [],
    publisher: "",
    datetime: Date,
    contents: "",
    thumbnail: "",
    url: "",
  });

  useEffect(() => {
    if (bookInfo.title.length > 0) {
      bookSearchHttpHandler("미움받을 용기", true);
    }

    return () => {
      bookSearchHttpHandler("미움받을 용기", true);
    };
  }, []);

  const bookSearchHttpHandler = async (query: string, reset: boolean) => {
    const params = {
      query: query,
    };

    const { data } = await bookSearch(params);
    setBookInfo({
      title: data.documents[0].title,
      authors: data.documents[0].authors,
      translator: data.documents[0].translator,
      publisher: data.documents[0].publisher,
      datetime: data.documents[0].datetime,
      contents: data.documents[0].contents,
      thumbnail: data.documents[0].thumbnail,
      url: data.documents[0].url,
    });
  };

  return (
    <>
      <BookInfo>
        <img src={bookInfo.thumbnail} alt="Book_Image" />
        <h3>{bookInfo.title}</h3>
      </BookInfo>
      <Box>
        <Subtitle title="도서 정보 보기" />
        <p>{bookInfo.contents}...</p>
        <li>저자: {bookInfo.authors}</li>
        <li>출판사: {bookInfo.publisher}</li>
        <li>출간일: {`${bookInfo.datetime}`}</li>
        {/* 페이지와 분야... */}
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
  li {
    font-size: 12px;
    display: block;
    margin: 3px 0 0;
  }
`;

export default BookDescription;
