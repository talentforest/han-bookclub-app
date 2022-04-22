import Title from "components/common/Title";
import BookInfoBox from "components/common/BookInfoBox";
import { Container } from "theme/globalStyle";

const Book = () => {
  return (
    <Container>
      <Title title="의 책" />
      <hr></hr>
      <BookInfoBox />
    </Container>
  );
};

export default Book;
