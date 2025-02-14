import { useEffect, useState } from 'react';

import { getCollection } from 'api/firebase/getFbDoc';
import { setDocument } from 'api/firebase/setFbDoc';

import { ISearchedBook } from 'data/bookAtom';
import { clubByYearAtom } from 'data/clubAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import {
  formatDate,
  getNextMonthId,
  getThirdSunday,
  nextMonth,
  thisMonth,
  thisYear,
} from 'utils';

import SquareBtn from 'components/common/button/SquareBtn';

interface PropsType {
  searchedBook: ISearchedBook;
}

const RegisterClubBookBtn = ({ searchedBook }: PropsType) => {
  const [thisYearBookClubInfos, setThisYearBookClubInfos] =
    useRecoilState(clubByYearAtom);

  const [submitted, setSubmitted] = useState(false);

  const { uid } = useRecoilValue(currAuthUserAtom);

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
    meeting: {
      place: '카페 느티',
      time: formatDate(meetingTime, "yyyy-MM-dd'T'HH:mm:ss"),
    },
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
  };

  const onNextMonthBookClubDocSubmit = async () => {
    await setDocument(BOOKCLUB_THIS_YEAR, getNextMonthId(), bookClubInfo);
    setSubmitted(true);
    alert('다음달 독서모임 책으로 등록되었습니다!');
  };

  const existNextBook = thisYearBookClubInfos.find(
    ({ id }) => id === getNextMonthId(),
  )?.book;

  const registeredBook =
    title === existNextBook?.title && publisher === existNextBook?.publisher;

  useEffect(() => {
    if (!existNextBook) {
      getCollection(`BookClub-${thisYear}`, setThisYearBookClubInfos);
    }
    if (existNextBook && registeredBook) {
      setSubmitted(true);
    }
  }, [submitted, existNextBook]);

  return (
    <>
      {submitted ? (
        <SquareBtn name="등록 완료" disabled className="ml-auto py-2" />
      ) : (
        <SquareBtn
          name={`다음 ${nextMonth}월 모임책으로 ${
            !registeredBook && existNextBook ? '변경' : '등록'
          }`}
          type="button"
          handleClick={onNextMonthBookClubDocSubmit}
          color="purple"
          className="ml-auto py-2"
        />
      )}
    </>
  );
};

export default RegisterClubBookBtn;
