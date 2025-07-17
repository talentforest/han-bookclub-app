import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { getCollection } from '@/api/firebase/getFbDoc';
import PreviousBookCard from '@/components/bookCard/PreviousBookCard';
import SelectYearBtnList from '@/components/common/SelectYearBtnList';
import EmptyCard from '@/components/common/container/EmptyCard';
import Section from '@/components/common/container/Section';
import { clubByYearAtom, selectedYearAtom } from '@/data/clubAtom';
import MobileHeader from '@/layout/mobile/MobileHeader';
import { thisYearMonthId } from '@/utils';

function PreviousClub() {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearAtom);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
  }, [selectedYear]);

  const handleChangeYear = (year: string) => setSelectedYear(year);

  return (
    <>
      <MobileHeader title="지난 한페이지" />

      <main>
        <SelectYearBtnList
          selectedYear={selectedYear}
          handleChangeYear={handleChangeYear}
        />

        <Section title={`${selectedYear}년의 한페이지`} className="!mt-10">
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
