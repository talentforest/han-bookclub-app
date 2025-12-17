import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { clubByNextYearAtom, clubByYearAtom } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { BOOKCLUB_NEXT_YEAR, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { nextMonth, thisYear } from '@/utils';

import Footer from '@/layout/Footer';
import MobileHeader from '@/layout/MobileHeader';

import NextMonthClub from '@/components/bookClub/NextMonthClub';
import ThisMonthBookClub from '@/components/bookClub/ThisMonthClub';
import VoteSlider from '@/components/bookVote/VoteSlider';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import RecommendedBookSwiperContainer from '@/components/post/recommendedBooks/RecommendedBookSwiperContainer';

const Home = () => {
  const navigate = useNavigate();

  const setThisYearClub = useSetRecoilState(clubByYearAtom);
  const setNextYearClub = useSetRecoilState(clubByNextYearAtom);

  useEffect(() => {
    getCollection(BOOKCLUB_THIS_YEAR, setThisYearClub);
    getCollection(BOOKCLUB_NEXT_YEAR, setNextYearClub);
  }, []);

  const buttonList = [
    {
      name: '월별 독서분야',
      onClick: () => navigate('/monthlyinfo', { state: 'fieldAndHost' }),
      color: 'blue' as const,
    },
    {
      name: '모임불참',
      onClick: () => navigate('/monthlyinfo', { state: 'absence' }),
      color: 'blue' as const,
    },
    {
      name: '챌린지',
      onClick: () => navigate('/challenge'),
      color: 'blue' as const,
    },
    {
      name: '연말결산',
      onClick: () => navigate('/yearClosingEvent'),
      color: 'blue' as const,
    },
  ];

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <Section title="이달의 모임정보">
          <ThisMonthBookClub />
        </Section>

        <Section title="다음달 모임책">
          <NextMonthClub />
          {+nextMonth === 12 && (
            <ChevronRightLinkBtn to={'/bookclub/2025-12'} title="자세히보기" />
          )}
        </Section>

        <Section className="!my-28 grid w-full grid-cols-4 gap-4 max-sm:my-20 max-sm:grid-cols-2 max-sm:gap-2.5">
          {buttonList.map(({ name, onClick, color }) => (
            <SquareBtn
              key={name}
              name={`${thisYear} ${name}`}
              className="h-fit w-full rounded-xl !px-0 py-4"
              color={color}
              handleClick={onClick}
            />
          ))}
        </Section>

        <Section title="한페이지 멤버들이 소개했던 책">
          <RecommendedBookSwiperContainer maxLength={5} />
        </Section>

        <Section title="모임책 투표함">
          <VoteSlider />
        </Section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
