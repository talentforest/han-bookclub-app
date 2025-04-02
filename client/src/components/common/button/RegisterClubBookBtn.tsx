import { useEffect, useState } from 'react';

import { getCollection, getDocument } from 'api/firebase/getFbDoc';
import { setDocument } from 'api/firebase/setFbDoc';

import { ISearchedBook } from 'data/bookAtom';
import { clubByYearAtom, thisMonthClubAtom } from 'data/clubAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import {
  formatDate,
  getNextMonthId,
  getThirdSunday,
  nextMonth,
  thisMonth,
  thisYear,
  thisYearMonthId,
} from 'utils';

import SquareBtn from 'components/common/button/SquareBtn';

interface PropsType {
  searchedBook: ISearchedBook;
  registerMonthType: 'thisMonth' | 'nextMonth';
}

const RegisterClubBookBtn = ({
  searchedBook,
  registerMonthType,
}: PropsType) => {
  const [thisYearBookClubInfos, setThisYearBookClubInfos] =
    useRecoilState(clubByYearAtom);
  const setThisMonthClub = useSetRecoilState(thisMonthClubAtom);

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
    isbn,
  } = searchedBook;

  const meetingTime = getThirdSunday(
    +thisYear,
    registerMonthType === 'thisMonth' ? +thisMonth : +thisMonth + 1,
    13,
    0,
  );

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
      isbn,
    },
    meeting: {
      place: '카페 느티',
      time: formatDate(meetingTime, "yyyy-MM-dd'T'HH:mm:ss"),
    },
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
  };

  const existNextBook = thisYearBookClubInfos.find(
    ({ id }) => id === getNextMonthId(),
  )?.book;

  const nextBookState = existNextBook ? '변경' : '등록';

  const existThisMonthBook = thisYearBookClubInfos.find(
    ({ id }) => id === thisYearMonthId,
  )?.book;

  const thisBookState = existThisMonthBook ? '변경' : '등록';

  useEffect(() => {
    if (registerMonthType === 'nextMonth' && !existNextBook) {
      getCollection(`BookClub-${thisYear}`, setThisYearBookClubInfos);
    }
    if (registerMonthType === 'thisMonth' && !existThisMonthBook) {
      getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthClub);
    }
  }, []);

  useEffect(() => {
    if (registerMonthType === 'nextMonth' && existNextBook) {
      setSubmitted(true);
    }
  }, [submitted]);

  const registerMonth = {
    id: registerMonthType === 'nextMonth' ? getNextMonthId() : thisYearMonthId,
    monthNum: registerMonthType === 'nextMonth' ? +nextMonth : +thisMonth,
    name: registerMonthType === 'nextMonth' ? '다음달' : '이번달',
    state: registerMonthType === 'nextMonth' ? nextBookState : thisBookState,
  };

  const onSubmit = async () => {
    await setDocument(BOOKCLUB_THIS_YEAR, registerMonth.id, bookClubInfo);
    setSubmitted(true);
    if (registerMonthType === 'thisMonth') {
      setThisMonthClub(bookClubInfo);
    }
    alert(`${registerMonth.name} 독서모임 책으로 등록되었습니다!`);
  };

  return (
    <>
      {submitted && existNextBook?.title === searchedBook?.title ? (
        <SquareBtn name="등록 완료" disabled className="ml-auto py-2" />
      ) : (
        <SquareBtn
          name={`${registerMonth.monthNum}월 모임책으로 ${registerMonth.state}`}
          type="button"
          handleClick={onSubmit}
          color="purple"
          className="ml-auto py-2"
        />
      )}
    </>
  );
};

export default RegisterClubBookBtn;
