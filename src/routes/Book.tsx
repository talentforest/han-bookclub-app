import Title from "components/common/Title";
import BookInfoBox from "components/common/BookInfoBox";
import { Container } from "theme/globalStyle";
import SubjectBox from "components/book/SubjectBox";

const Book = () => {
  return (
    <Container>
      <Title title="의 책" />
      <hr></hr>
      <BookInfoBox />
      <SubjectBox />
    </Container>
  );
};

export default Book;
