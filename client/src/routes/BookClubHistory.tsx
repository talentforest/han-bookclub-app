import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookClubByYearState, selectedYearState } from 'data/bookClubAtom';
import { useRecoilState } from 'recoil';

import { bookClubYearList } from 'appConstants';
import { thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import HistoryBookCard from 'components/bookCard/HistoryBookCard';
import SquareBtn from 'components/common/button/SquareBtn';
import EmptyCard from 'components/common/container/EmptyCard';
import Section from 'components/common/container/Section';

function BookClubHistory() {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearState);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(bookClubByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  const clubHistory = clubInfoDocs?.filter(doc => doc?.id < thisYearMonthId);

  return (
    <>
      <MobileHeader title="지난 한페이지" />

      <main>
        <ul className="mb-10 mt-1 flex flex-wrap gap-3 max-sm:mb-10 max-sm:gap-2">
          {bookClubYearList.map(year => (
            <li key={year}>
              <SquareBtn
                color={year === selectedYear ? 'blue' : 'gray'}
                name={`${year}년`}
                type="button"
                handleClick={() => setSelectedYear(year)}
                className="border py-0"
              />
            </li>
          ))}
        </ul>

        <Section title={`${selectedYear}년의 한페이지`}>
          <ul className="grid grid-cols-4 gap-5 max-md:grid-cols-3 max-sm:mt-2 max-sm:flex max-sm:flex-col [&>div]:col-span-4">
            {clubHistory?.length ? (
              clubHistory?.map(document => (
                <Link key={document.id} to={document.id} state={{ document }}>
                  <HistoryBookCard document={document} />
                </Link>
              ))
            ) : (
              <EmptyCard text="독서모임에 아직 등록된 책이 없습니다." />
            )}
          </ul>
        </Section>
      </main>
    </>
  );
}

export default BookClubHistory;
