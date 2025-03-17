import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { clubByYearAtom, selectedYearAtom } from 'data/clubAtom';
import { useRecoilState } from 'recoil';

import { operationYearList } from 'appConstants';
import { thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import PreviousBookCard from 'components/bookCard/PreviousBookCard';
import SquareBtn from 'components/common/button/SquareBtn';
import EmptyCard from 'components/common/container/EmptyCard';
import Section from 'components/common/container/Section';

function PreviousClub() {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearAtom);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
  }, [selectedYear]);

  return (
    <>
      <MobileHeader title="지난 한페이지" />

      <main>
        <ul className="mb-10 mt-1 flex flex-wrap gap-4 max-sm:mb-10 max-sm:gap-x-2.5 max-sm:gap-y-2">
          {operationYearList.map(year => (
            <li key={year}>
              <SquareBtn
                color={year === selectedYear ? 'blue' : 'gray'}
                name={`${year}년`}
                type="button"
                handleClick={() => setSelectedYear(year)}
                className="py-0"
              />
            </li>
          ))}
        </ul>

        <Section title={`${selectedYear}년의 한페이지`}>
          {clubByYear.length !== 0 ? (
            <ul className="grid grid-cols-4 gap-5 max-md:grid-cols-3 max-sm:mt-2 max-sm:flex max-sm:flex-col [&>div]:col-span-4">
              {clubByYear.map(docData => (
                <Link
                  key={docData.id}
                  to={thisYearMonthId === docData.id ? '/bookclub' : docData.id}
                  state={{
                    docId: docData.id,
                    docData,
                  }}
                >
                  <PreviousBookCard document={docData} />
                </Link>
              ))}
            </ul>
          ) : (
            <EmptyCard text="독서모임에 아직 등록된 책이 없습니다." />
          )}
        </Section>
      </main>
    </>
  );
}

export default PreviousClub;
