import { ISearchedBook } from 'data/bookAtom';
import { useRecoilState } from 'recoil';
import { bookClubByYearState } from 'data/bookClubAtom';
import { getNextMonthId, nextMonth, thisYear } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import SquareBtn from 'components/atoms/button/SquareBtn';
import useSetBookClubDoc from 'hooks/useSetBookClubDoc';

interface PropsType {
  searchedBook: ISearchedBook;
}

const RegisterClubBookBtn = ({ searchedBook }: PropsType) => {
  const [thisYearBookClubInfos, setThisYearBookClubInfos] =
    useRecoilState(bookClubByYearState);

  const { submitted, setSubmitted, setNextMonthBookClubDoc } =
    useSetBookClubDoc({ searchedBook });

  const existNextBookClubDoc = thisYearBookClubInfos.find(
    (bookclub) => bookclub.id === getNextMonthId()
  );

  const registeredBook =
    searchedBook.title === existNextBookClubDoc?.book?.title &&
    searchedBook.publisher === existNextBookClubDoc?.book?.publisher;

  useEffect(() => {
    if (!existNextBookClubDoc) {
      getCollection(`BookClub-${thisYear}`, setThisYearBookClubInfos);
    }
    if (existNextBookClubDoc && registeredBook) {
      setSubmitted(true);
    }
  }, [submitted, existNextBookClubDoc]);

  return (
    <>
      {submitted ? (
        <SquareBtn name='등록 완료' disabled width='fit-content' />
      ) : (
        <SquareBtn
          name={`다음 ${nextMonth}월 모임책으로 ${
            !registeredBook && existNextBookClubDoc ? '변경' : '등록'
          }`}
          type='button'
          handleClick={setNextMonthBookClubDoc}
          color='purple'
          width='fit-content'
        />
      )}
    </>
  );
};

export default RegisterClubBookBtn;
