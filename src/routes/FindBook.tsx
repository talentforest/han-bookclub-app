import { useState } from "react";
import { Container, Input } from "theme/commonStyle";
import { bookSearchHandler } from "api/api";
import styled from "styled-components";
import ResultBox from "components/bookfind/ResultBox";
import BackButtonHeader from "components/header/BackButtonHeader";

const FindBook = () => {
  const [bookInfo, setBookInfo] = useState([]);
  const [bookQuery, setBookQuery] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (bookQuery === "") return;

      bookSearchHandler(bookQuery, true, setBookInfo);
      setBookQuery("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBookQuery(event.currentTarget.value);
  };

  return (
    <>
      <BackButtonHeader title="책 검색하기" />
      <Container>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="등록하실 책을 검색해주세요."
            autoFocus
            value={bookQuery}
            onChange={onChange}
          />
          <Input type="submit" value="검색" />
        </Form>
        <BookResults>
          <span>검색결과 {bookInfo.length}건</span>
          <p>최대 10건이 검색됩니다.</p>
          {bookInfo.map((bookInfo, index) => (
            <ResultBox bookInfo={bookInfo} key={index} />
          ))}
        </BookResults>
      </Container>
    </>
  );
};

const BookResults = styled.section`
  padding: 10px 0;
  > span {
    display: block;
    padding-bottom: 5px;
    font-size: 16px;
  }
  > p {
    display: block;
    padding-bottom: 10px;
    font-size: 14px;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  input:first-child {
    width: 80%;
    margin-right: 10px;
  }
  input:last-child {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.container.blue};
    color: ${(props) => props.theme.text.white};
  }
`;

export default FindBook;
