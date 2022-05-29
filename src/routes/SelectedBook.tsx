import { ExpandCircleDown, Star } from "@mui/icons-material";
import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { BookInfo, Container } from "theme/commonStyle";
import { time } from "util/time";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";
import { bookDescState } from "data/bookAtom";

const SelectedBook = () => {
  const userData = useRecoilValue(currentUserState);
  const bookData = useRecoilValue(bookDescState);
  const [bookInfo, setBookInfo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const match = useMatch(`/book/find/:id`);

  console.log(bookData);

  useEffect(() => {
    bookSearchHandler(match?.params.id, true, setBookInfo);
    if (bookData[0]?.title === match?.params.id) {
      setToggle(true);
    }
    return () => {
      bookSearchHandler(match?.params.id, true, setBookInfo);
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
      <BookInfo>
        <img src={bookInfo[0]?.thumbnail} alt="Book_Image" />
        <h3>{bookInfo[0]?.title}</h3>
      </BookInfo>
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
      <BookDetail>
        <li>
          <ExpandCircleDown />
          저자: {bookInfo[0]?.authors.join(", ")}
        </li>
        {bookInfo[0]?.translators.length !== 0 ? (
          <li>
            <ExpandCircleDown />
            역자: {bookInfo[0]?.translators.join(", ")}
          </li>
        ) : null}
        <li>
          <ExpandCircleDown />
          출간일: {time(bookInfo[0]?.datetime)}
        </li>
        <li>
          <ExpandCircleDown />
          출판사: {bookInfo[0]?.publisher}
        </li>
        <li>
          <ExpandCircleDown />
          정가: {bookInfo[0]?.price}원
        </li>
        <p>줄거리 {bookInfo[0]?.contents}...</p>
      </BookDetail>
      <DetailButton>
        <a href={`${bookInfo[0]?.url}`} target="_blank" rel="noreferrer">
          <span>상세정보 보러가기</span>
        </a>
      </DetailButton>
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

const DetailButton = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 5px;
  a {
    span {
      font-size: 14px;
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

const BookDetail = styled.ul`
  border-radius: 10px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 20px auto 0;
  padding: 20px 15px;
  width: 95%;
  > li {
    margin-bottom: 5px;
    font-size: 13px;
    display: flex;
    align-items: center;
    svg {
      width: 14px;
      margin-right: 5px;
      padding-top: 2px;
    }
  }
  > p {
    margin-top: 10px;
    line-height: 1.6;
  }
`;

export default SelectedBook;
