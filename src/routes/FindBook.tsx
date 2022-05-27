import { bookDescState } from "data/bookAtom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Container, Header } from "theme/commonStyle";
import { bookSearch } from "api/api";
import { Time } from "util/Time";
import styled from "styled-components";

const FindBook = () => {
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);
  const [bookQuery, setBookQuery] = useState(bookInfo.title);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (bookQuery === "") return;
      bookSearchHandler(bookQuery, true);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

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

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBookQuery(event.currentTarget.value);
  };

  return (
    <>
      <Header>
        <Title>책 검색하기</Title>
      </Header>
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
          <span>검색결과</span>
          <BookResultBox>
            <img src={bookInfo.thumbnail} alt="Book_Image" />
            <BookDetail>
              <h3>{bookInfo.title}</h3>
              <span>저자: {bookInfo.authors}</span>
              <span>역자: {bookInfo.translators}</span>
              <span>출판사: {bookInfo.publisher}</span>
              <span>출간일: {Time(bookInfo.datetime)}</span>
              <a href={`${bookInfo.url}`} target="_blank" rel="noreferrer">
                <span>상세정보 보러가기</span>
              </a>
            </BookDetail>
          </BookResultBox>
        </BookResults>
      </Container>
    </>
  );
};

const BookResults = styled.div`
  padding: 10px 0;
  > span {
    font-size: 13px;
  }
`;
const BookResultBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px 15px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  img {
    width: auto;
    height: 100px;
    margin-right: 20px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  }
`;

const BookDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
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

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
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
