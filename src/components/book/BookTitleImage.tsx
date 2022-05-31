import { bookDescState } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { BookInfo } from "theme/commonStyle";

const BookTitleImage = () => {
  const bookInfo = useRecoilValue(bookDescState);
  return (
    <BookInfo>
      {bookInfo[0]?.thumbnail ? (
        <img src={bookInfo[0]?.thumbnail} alt="Book_Image" />
      ) : (
        <div />
      )}
      <h3>{bookInfo[0]?.title}</h3>
    </BookInfo>
  );
};

export default BookTitleImage;
