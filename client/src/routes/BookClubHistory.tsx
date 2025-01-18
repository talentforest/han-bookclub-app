import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookClubByYearState, selectedYearState } from 'data/bookClubAtom';
import { useRecoilState } from 'recoil';

import { bookClubYearList } from 'appConstants';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import { thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import HistoryBookCard from 'components/bookCard/HistoryBookCard';
import Subtitle from 'components/common/Subtitle';
import SquareBtn from 'components/common/button/SquareBtn';
import EmptyCard from 'components/common/container/EmptyCard';

function BookClubHistory() {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearState);
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(bookClubByYearState);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubInfoDocs);
  }, [setClubInfoDocs, selectedYear]);

  const clubHistory = clubInfoDocs?.filter(doc => doc?.id < thisYearMonthId);

  return (
    <>
      <MobileHeader title="지난 독서모임 한페이지" />

      <main>
        <ul className="mb-10 flex flex-wrap gap-3 sm:gap-2">
          {bookClubYearList.map(year => (
            <li key={year}>
              <SquareBtn
                color={year === selectedYear ? 'purple' : 'gray'}
                name={`${year}년`}
                type="button"
                handleClick={() => setSelectedYear(year)}
              />
            </li>
          ))}
        </ul>

        <Subtitle title={`${selectedYear}년의 한페이지`} />

        <ul className="grid grid-cols-4 gap-5 sm:flex sm:flex-col md:grid-cols-3 [&>div]:col-span-4">
          {clubHistory?.length ? (
            clubHistory?.map(document => (
              <li key={document.id}>
                <Link to={document.id} state={{ document }}>
                  {document && <HistoryBookCard document={document} />}

                  <HiMiniArrowUpRight
                    fill="#aaa"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                    }}
                  />
                </Link>
              </li>
            ))
          ) : (
            <EmptyCard text="독서모임에 아직 등록된 책이 없습니다." />
          )}
        </ul>
      </main>
    </>
  );
}

export default BookClubHistory;
