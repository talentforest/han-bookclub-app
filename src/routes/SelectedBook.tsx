import { Star } from "@mui/icons-material";
import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { BookCoverTitleBox, Container } from "theme/commonStyle";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { bookDescState } from "data/bookAtom";
import Subtitle from "components/common/Subtitle";
import BookDesc from "components/common/BookDesc";
import styled from "styled-components";

const SelectedBook = () => {
  const userData = useRecoilValue(currentUserState);
  const [bookData, setBookData] = useRecoilState(bookDescState);
  const [toggle, setToggle] = useState(false);
  const match = useMatch(`/book/find/:id`);

  useEffect(() => {
    bookSearchHandler(match?.params.id, true, setBookData);
    if (bookData[0]?.title === match?.params.id) {
      setToggle(true);
    }
    return () => {
      bookSearchHandler(match?.params.id, true, setBookData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.params.id]);

  const onClick = async () => {
    try {
      setToggle((prev) => !prev);
      if (!toggle) {
        await addDoc(collection(dbService, "Book of the Month"), {
          bookTitle: match?.params.id,
          createdAt: Date.now(),
          creatorId: userData.uid,
          month: new Date().getMonth() + 1,
        });
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <Container>
      <Subtitle title="도서 정보" />
      <BookCoverTitleBox>
        <img src={bookData[0]?.thumbnail} alt="Book_Image" />
        <h3>{bookData[0]?.title}</h3>
      </BookCoverTitleBox>
      {!toggle ? (
        <BookSection>
          <button onClick={onClick}>이달의 책으로 등록</button>
        </BookSection>
      ) : (
        <Selected>
          <button onClick={onClick}>
            이달의 책 선정 <Star sx={{ fontSize: 18 }} color="primary" />
          </button>
        </Selected>
      )}
      <BookDesc bookInfo={bookData[0]} />
    </Container>
  );
};

const BookSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px auto 0;
  button {
    display: flex;
    align-items: center;
    font-size: 13px;
    border: none;
    border-radius: 30px;
    padding: 3px 10px;
    height: 30px;
    font-weight: 700;
    color: #aaa;
    background-color: ${(props) => props.theme.text.lightGray};
    cursor: pointer;
  }
`;

const Selected = styled(BookSection)`
  button {
    color: ${(props) => props.theme.text.accent};
    background-color: ${(props) => props.theme.container.lightBlue};
  }
`;

export default SelectedBook;
