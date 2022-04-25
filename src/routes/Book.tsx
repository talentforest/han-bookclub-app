import { Container, Header } from "theme/globalStyle";
import Title from "components/common/Title";
import BookDescBox from "components/common/BookDescBox";
import SubjectBox from "components/book/SubjectBox";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";

const Book = () => {
  return (
    <>
      <Header>
        <Title title="의 책" />
      </Header>
      <Container>
        <BookInfo>
          <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
          <h3>떨림과 울림</h3>
        </BookInfo>
        <BookDescBox />
        <Subtitle title="발제문 작성하기" />
        <SubjectBox />
      </Container>
    </>
  );
};

const BookInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 135px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

export default Book;
