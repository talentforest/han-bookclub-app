import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { useHandleModal } from '@/hooks';

import { formatDate, getThirdSunday } from '@/utils';

import { BaseBookData } from '@/types';

import NewBookClubModal from '@/components/bookClub/NewBookClubModal';
import SquareBtn from '@/components/common/button/SquareBtn';

interface RegisterClubBookBtnProps {
  searchedBook: BaseBookData;
  registerYearMonth: string;
}

const RegisterClubBookBtn = ({
  searchedBook,
  registerYearMonth,
}: RegisterClubBookBtnProps) => {
  const monthlyBookClub = useRecoilValue(
    clubByMonthSelector(registerYearMonth),
  );

  const [submitted, setSubmitted] = useState(false);

  const monthNum = +registerYearMonth.slice(-2);
  const yearNum = +registerYearMonth.slice(0, 4);

  const { showModal } = useHandleModal();

  const defaultMeeting = {
    place: '카페 느티',
    time: formatDate(
      getThirdSunday(yearNum, monthNum, 11, 0),
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
  };

  const onBtnClick = async () => {
    showModal({
      element: (
        <NewBookClubModal
          title={`${monthNum}월 독서모임 정보`}
          currentValue={defaultMeeting}
          yearMonthId={registerYearMonth}
          registerBook={searchedBook}
        />
      ),
    });
  };

  useEffect(() => {
    if (monthlyBookClub) {
      setSubmitted(true);
    }
  }, [submitted]);

  return (
    <>
      {submitted && searchedBook.title === monthlyBookClub?.book.title ? (
        <SquareBtn name="등록 완료" disabled className="ml-auto py-2" />
      ) : (
        <SquareBtn
          name={`${monthNum}월 모임책으로 ${monthlyBookClub?.book ? '변경' : '등록'}`}
          type="button"
          handleClick={onBtnClick}
          color="blue"
          className="ml-auto py-2"
        />
      )}
    </>
  );
};

export default RegisterClubBookBtn;
