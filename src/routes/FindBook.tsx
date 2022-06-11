import { useState } from "react";
import { Container } from "theme/commonStyle";
import { bookSearchHandler } from "api/api";
import styled from "styled-components";
import ResultBox from "components/bookfind/ResultBox";
import BackButtonHeader from "components/common/BackButtonHeader";

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
          <Button type="submit" value="검색" />
        </Form>
        <BookResults>
          <span>검색결과 {bookInfo.length}건</span>
          {bookInfo.map((bookInfo, index) => (
            <ResultBox bookInfo={bookInfo} key={index} />
          ))}
        </BookResults>
      </Container>
    </>
  );
};

const BookResults = styled.div`
  padding: 10px 0;
  > span {
    display: block;
    padding-bottom: 10px;
    font-size: 13px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  display: flex;
  justify-items: center;
  width: 85%;
  height: 40px;
  border: none;
  border: 1px solid ${(props) => props.theme.container.blue};
  border-radius: 5px;
  padding: 0 10px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.input`
  font-size: 13px;
  width: 15%;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  cursor: pointer;
`;

export default FindBook;
