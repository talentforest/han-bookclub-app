import { bookDescState } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { BookInfo } from "theme/commonStyle";

const BookImage = () => {
  const bookInfo = useRecoilValue(bookDescState);
  return (
    <BookInfo>
      <img src={bookInfo[0]?.thumbnail} alt="Book_Image" />
      <h3>{bookInfo[0]?.title}</h3>
    </BookInfo>
  );
};

export default BookImage;
