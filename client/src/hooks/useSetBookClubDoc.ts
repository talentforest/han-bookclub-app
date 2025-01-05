import { ISearchedBook } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getNextMonthId,
  getThirdSunday,
  thisMonth,
  thisYear,
} from 'util/index';
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

  const meetingTime = getThirdSunday(+thisYear, +thisMonth + 1, 13, 0);

  console.log(meetingTime);
  console.log(new Date().toISOString()); // date-fns로 처리하기

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
    meeting: { place: '카페 느티', time: meetingTime },
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
