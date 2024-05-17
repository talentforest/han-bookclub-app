import { ISearchedBook } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getNextMonthId } from 'util/index';
import { THIS_YEAR_BOOKCLUB } from 'constants/index';

interface PropsType {
  searchedBook: ISearchedBook;
}

const useSetBookClubDoc = ({ searchedBook }: PropsType) => {
  const [submitted, setSubmitted] = useState(false);

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

  const setNextMonthBookClubDoc = async () => {
    const selectMonthRef = doc(dbService, THIS_YEAR_BOOKCLUB, getNextMonthId());
    await setDoc(selectMonthRef, bookClubInfo);
    setSubmitted(true);
  };

  return {
    submitted,
    setSubmitted,
    setNextMonthBookClubDoc,
  };
};

export default useSetBookClubDoc;
