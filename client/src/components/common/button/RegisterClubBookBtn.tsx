import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { useHandleModal } from '@/hooks';

import { formatDate, getThirdSunday, thisYear } from '@/utils';

import { BookData } from '@/types';

import NewBookClubModal from '@/components/bookClub/NewBookClubModal';
import SquareBtn from '@/components/common/button/SquareBtn';

interface RegisterClubBookBtnProps {
  searchedBook: BookData;
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

  const month = registerYearMonth.slice(-2);

  const { showModal } = useHandleModal();

  const defaultMeeting = {
    place: '카페 느티',
    time: formatDate(
      getThirdSunday(+thisYear, +month, 11, 0),
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
  };

  const onBtnClick = async () => {
    showModal({
      element: (
        <NewBookClubModal
          title={`${month}월 독서모임 정보`}
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
          name={`${month}월 모임책으로 ${monthlyBookClub?.book ? '변경' : '등록'}`}
          type="button"
          handleClick={onBtnClick}
          color="darkBlue"
          className="ml-auto py-2"
        />
      )}
    </>
  );
};

export default RegisterClubBookBtn;
