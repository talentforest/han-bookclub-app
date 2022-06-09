import { Star } from "@mui/icons-material";
import { bookSearchHandler } from "api/api";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { BookCoverTitleBox, Container, IconHeader } from "theme/commonStyle";
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
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { BookMeetingInfo } from "./BookMeeting";
import { thisYearMonth } from "util/constants";
import Subtitle from "components/common/Subtitle";
import BookDesc from "components/common/BookDesc";
import styled from "styled-components";
import BackButton from "components/common/BackButton";

const FindedBook = () => {
  const [toggle, setToggle] = useState(false);
  const [findbookData, setFindBookData] = useState([]);
  const [allClubBookDocData, setAllClubBookDocData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(thisYearMonth);
  const userData = useRecoilValue(currentUserState);
  const match = useMatch(`/bookmeeting/find/:id`);

  useEffect(() => {
    bookSearchHandler(match?.params.id, true, setFindBookData);
    getAllBookMeetingInfo();

    return () => {
      getAllBookMeetingInfo();
      bookSearchHandler(match?.params.id, true, setFindBookData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBookMeetingInfo = async () => {
    const q = query(
      collection(dbService, "BookMeeting Info"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as BookMeetingInfo;
      });
      const BookDocData = newArray.map((item) => item.book);
      setAllClubBookDocData(BookDocData);
    });
  };

  const onClick = async () => {
    setToggle((prev) => !prev);
    handleThisMonthBookDoc();
  };

  const onMonthChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSelectedMonth(value);
  };

  const handleThisMonthBookDoc = async () => {
    if (toggle === false) {
      if (allClubBookDocData[0]?.id !== selectedMonth) {
        setThisMonthBookMeetingDoc();
      } else {
        updateThisMonthBookMeetingDoc();
      }
    } else if (toggle === true) {
      deleteThisMonthBookMeetingDoc();
    }
  };

  const setThisMonthBookMeetingDoc = async () => {
    await setDoc(doc(dbService, "BookMeeting Info", `${selectedMonth}`), {
      book: {
        thumbnail: findbookData[0].thumbnail,
        title: match?.params.id,
        authors: findbookData[0].authors,
        translators: findbookData[0].translators,
        price: findbookData[0].price,
        contents: findbookData[0].contents,
        publisher: findbookData[0].publisher,
        datetime: findbookData[0].datetime,
        url: findbookData[0].url,
      },
      meeting: {
        place: "",
        time: "",
      },
      createdAt: Date.now(),
      creatorId: userData.uid,
    });
  };

  const updateThisMonthBookMeetingDoc = async () => {
    const thisMonthBookRef = doc(
      dbService,
      "BookMeeting Info",
      `${selectedMonth}`
    );
    await updateDoc(thisMonthBookRef, {
      book: {
        thumbnail: findbookData[0].thumbnail,
        title: match?.params.id,
        authors: findbookData[0].authors,
        translators: findbookData[0].translators,
        price: findbookData[0].price,
        contents: findbookData[0].contents,
        publisher: findbookData[0].publisher,
        datetime: findbookData[0].datetime,
        url: findbookData[0].url,
      },
      meeting: {
        place: "",
        time: "",
      },
      createdAt: Date.now(),
      creatorId: userData.uid,
    });
  };

  const deleteThisMonthBookMeetingDoc = async () => {
    const thisMonthBookRef = doc(
      dbService,
      "BookMeeting Info",
      `${selectedMonth}`
    );
    await deleteDoc(thisMonthBookRef);
  };

  const checkClubBook = allClubBookDocData
    .map((item) => item.title)
    .includes(findbookData[0]?.title);

  return (
    <>
      <IconHeader>
        <BackButton />
        <Subtitle title="도서 정보" />
      </IconHeader>
      <Container>
        <BookCoverTitleBox>
          <img src={findbookData[0]?.thumbnail} alt="Book_Image" />
          <h3>{findbookData[0]?.title}</h3>
          {checkClubBook ? (
            <Registered>클럽북으로 등록 완료된 책이에요.</Registered>
          ) : (
            <></>
          )}
        </BookCoverTitleBox>
        {toggle ? (
          <Selected>
            <button onClick={onClick}>
              북클럽 책 등록 완료
              <Star />
            </button>
          </Selected>
        ) : (
          <BookSection>
            <input
              type="month"
              defaultValue={thisYearMonth}
              name="thisMonthBook"
              onChange={onMonthChange}
            />
            <button type="submit" onClick={onClick}>
              북클럽 도서 등록
            </button>
          </BookSection>
        )}
        <BookDesc bookInfo={findbookData[0]} />
      </Container>
    </>
  );
};

const Registered = styled.span`
  font-size: 12px;
  margin-top: 5px;
  padding: 3px 8px;
  width: fit-contents;
  border-radius: 15px;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.accent}; ;
`;

const BookSection = styled.form`
  display: flex;
  justify-content: center;
  margin: 25px auto 0;
  button {
    display: flex;
    align-items: center;
    font-size: 13px;
    border: none;
    border-radius: 5px;
    padding: 3px 10px;
    margin-left: 10px;
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
