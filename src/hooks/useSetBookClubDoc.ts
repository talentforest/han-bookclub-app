import { IBookApi } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { thisYearMonthId, THIS_YEAR_BOOKCLUB } from 'util/index';

interface PropsType {
  searchedBook: IBookApi;
}

const useSetBookClubDoc = ({ searchedBook }: PropsType) => {
  const [toggle, setToggle] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(`${thisYearMonthId}`);
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

  const bookClubInfo = {
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
    meeting: { place: '', time: '' },
    createdAt: Date.now(),
    creatorId: userData.uid,
  };

  const setThisYearBookClubDoc = async () => {
    const selectMonthRef = doc(
      dbService,
      THIS_YEAR_BOOKCLUB,
      `${selectedMonth}`
    );
    await setDoc(selectMonthRef, bookClubInfo);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setThisYearBookClubDoc();
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

export default useSetBookClubDoc;
