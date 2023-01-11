import { IBookApi } from 'data/bookAtom';
import { IBookClubMonthInfo } from 'data/documentsAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CLUB_INFO, thisYearMonthIso } from 'util/index';

interface PropsType {
  clubDocs: IBookClubMonthInfo[];
  searchedBook: IBookApi;
}

const useHandleClubInfoDoc = ({ clubDocs, searchedBook }: PropsType) => {
  const [toggle, setToggle] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(`${thisYearMonthIso}`);
  const userData = useRecoilValue(currentUserState);
  const {
    thumbnail,
    title,
    authors,
    translators,
    price,
    contents,
    publisher,
    datetime,
    url,
  } = searchedBook;

  const clubInfoDoc = {
    book: {
      thumbnail,
      title,
      authors,
      translators,
      price,
      contents,
      publisher,
      datetime,
      url,
    },
    meeting: {
      place: '',
      time: '',
    },
    createdAt: Date.now(),
    creatorId: userData.uid,
  };

  const setClubInfoDoc = async () => {
    const selectMonthRef = doc(dbService, CLUB_INFO, `${selectedMonth}`);
    await setDoc(selectMonthRef, clubInfoDoc);
  };

  const deleteClubInfoDoc = async () => {
    const isClubBook = clubDocs.find(
      (item) => item.book.title === searchedBook.title
    );
    const clubInfoDocRef = doc(dbService, CLUB_INFO, `${isClubBook?.id}`);
    await deleteDoc(clubInfoDocRef);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.uid !== process.env.REACT_APP_ADMIN_KEY) {
      return alert('북클럽책 선정은 관리자에게 문의해주세요.');
    }
    toggle ? deleteClubInfoDoc() : setClubInfoDoc();
    setToggle((prev) => !prev);
  };

  const onMonthChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSelectedMonth(value);
  };

  return {
    toggle,
    setToggle,
    onSubmit,
    onMonthChange,
  };
};

export default useHandleClubInfoDoc;
