import { Container, Header } from "theme/globalStyle";
import Title from "components/common/Title";
import BookInfoBox from "components/common/BookDescBox";
import SubjectBox from "components/book/SubjectBox";
import Subtitle from "components/common/Subtitle";

const Book = () => {
  return (
    <>
      <Header>
        <Title title="의 책" />
      </Header>
      <Container>
        <BookInfoBox />
        <Subtitle title="발제문 작성하기" />
        <SubjectBox />
      </Container>
    </>
  );
};

export default Book;
