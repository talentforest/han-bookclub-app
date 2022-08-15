import { IBookApi } from "data/bookAtom";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { IBookMeeting } from "util/getFirebaseDoc";
import { thisYearMonth } from "util/constants";

interface PropsType {
  bookMeetingDocs: IBookMeeting[];
  findbookData: IBookApi;
}

const useHandleThisMonthDoc = ({
  bookMeetingDocs,
  findbookData,
}: PropsType) => {
  const [toggle, setToggle] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(`${thisYearMonth}`);
  const userData = useRecoilValue(currentUserState);

  const handleThisMonthBookDoc = async () => {
    if (toggle === false) {
      if (bookMeetingDocs[0]?.id !== selectedMonth) {
        setThisMonthBookMeetingDoc();
      } else {
        updateThisMonthBookMeetingDoc();
      }
    } else if (toggle === true) {
      deleteThisMonthBookMeetingDoc();
    }
  };

  const setThisMonthBookMeetingDoc = async () => {
    const book = findbookData;
    await setDoc(doc(dbService, "BookMeeting Info", `${selectedMonth}`), {
      book: {
        thumbnail: book.thumbnail,
        title: book.title,
        authors: book.authors,
        translators: book.translators,
        price: book.price,
        contents: book.contents,
        publisher: book.publisher,
        datetime: book.datetime,
        url: book.url,
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
    const book = findbookData;
    await updateDoc(thisMonthBookRef, {
      book: {
        thumbnail: book.thumbnail,
        title: book.title,
        authors: book.authors,
        translators: book.translators,
        price: book.price,
        contents: book.contents,
        publisher: book.publisher,
        datetime: book.datetime,
        url: book.url,
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToggle((prev) => !prev);
    handleThisMonthBookDoc();
  };

  const onMonthChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSelectedMonth(value);
  };

  return {
    toggle,
    setToggle,
    setSelectedMonth,
    handleThisMonthBookDoc,
    onSubmit,
    onMonthChange,
  };
};

export default useHandleThisMonthDoc;
