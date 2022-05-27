import { bookDescState } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { BookInfo } from "theme/commonStyle";

const BookImage = () => {
  const bookInfo = useRecoilValue(bookDescState);
  return (
    <BookInfo>
      <img src={bookInfo.thumbnail} alt="Book_Image" />
      <h3>{bookInfo.title}</h3>
    </BookInfo>
  );
};

export default BookImage;
