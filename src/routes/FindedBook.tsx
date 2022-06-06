import { Star } from "@mui/icons-material";
import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { BookCoverTitleBox, Container } from "theme/commonStyle";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import { bookDescState } from "data/bookAtom";
import Subtitle from "components/common/Subtitle";
import BookDesc from "components/common/BookDesc";
import styled from "styled-components";

const FindedBook = () => {
  const userData = useRecoilValue(currentUserState);
  const [toggle, setToggle] = useState(false);
  const [findbookData, setFindBookData] = useRecoilState(bookDescState);
  const [thisMonthBookDocData, setThisMonthBookDocData] = useState([]);
  const match = useMatch(`/bookmeeting/find/:id`);

  useEffect(() => {
    if (thisMonthBookDocData[0]?.bookTitle === match?.params?.id) {
      setToggle(true);
    }
    bookSearchHandler(match?.params.id, true, setFindBookData);
    getThisMonthBookData();

    return () => {
      getThisMonthBookData();
      bookSearchHandler(match?.params.id, true, setFindBookData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThisMonthBookData = async () => {
    const q = query(
      collection(dbService, "Book of the Month"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setThisMonthBookDocData(newArray);
    });
  };

  const onClick = async () => {
    setToggle((prev) => !prev);
    handleThisMonthBookDoc();
  };

  const handleThisMonthBookDoc = async () => {
    if (toggle === false) {
      if (
        thisMonthBookDocData[0]?.id !==
        `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`
      ) {
        setThisMonthBookDoc();
      } else {
        updateThisMonthBookDoc();
      }
    } else if (toggle === true) {
      deleteThisMonthBookDoc();
    }
  };

  const setThisMonthBookDoc = async () => {
    await setDoc(
      doc(
        dbService,
        "Book of the Month",
        `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`
      ),
      {
        bookCover: findbookData[0].thumbnail,
        bookTitle: match?.params.id,
        createdAt: Date.now(),
        creatorId: userData.uid,
      }
    );
  };

  const updateThisMonthBookDoc = async () => {
    const thisMonthBookRef = doc(
      dbService,
      "Book of the Month",
      `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`
    );
    await updateDoc(thisMonthBookRef, {
      bookCover: findbookData[0].thumbnail,
      bookTitle: match?.params.id,
      createdAt: Date.now(),
    });
  };

  const deleteThisMonthBookDoc = async () => {
    const thisMonthBookRef = doc(
      dbService,
      "Book of the Month",
      `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`
    );
    await deleteDoc(thisMonthBookRef);
  };

  return (
    <Container>
      <Subtitle title="도서 정보" />
      <BookCoverTitleBox>
        <img src={findbookData[0]?.thumbnail} alt="Book_Image" />
        <h3>{findbookData[0]?.title}</h3>
      </BookCoverTitleBox>
      {toggle ? (
        <Selected>
          <button onClick={onClick}>
            이달의 책 선정 <Star />
          </button>
        </Selected>
      ) : (
        <BookSection>
          <button onClick={onClick}>이달의 책으로 등록</button>
        </BookSection>
      )}
      <BookDesc bookInfo={findbookData[0]} />
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
    svg {
      fill: gold;
    }
  }
`;

export default FindedBook;
