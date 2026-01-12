import { useNavigate } from 'react-router-dom';

import { developmentMode } from '@/appConstants';

import { nextMonth, nextYearMonthId, thisYear, thisYearMonthId } from '@/utils';

import Footer from '@/layout/Footer';
import MobileHeader from '@/layout/MobileHeader';

import MonthBookClub from '@/components/bookClub/MonthBookClub';
import VoteSlider from '@/components/bookVote/VoteSlider';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import RecommendedBookSwiperContainer from '@/components/post/recommendedBooks/RecommendedBookSwiperContainer';

const Home = () => {
  const navigate = useNavigate();

  const buttonList = [
    {
      name: `${thisYear} 월별 독서분야`,
      onClick: () => navigate('/monthlyinfo', { state: 'fieldAndHost' }),
      color: 'blue' as const,
    },
    // {
    //   name: `${thisYear} 챌린지`,
    //   onClick: () => navigate('/challenge'),
    //   color: 'blue' as const,
    // },
    {
      name: `${thisYear} 모임불참`,
      onClick: () => navigate('/monthlyinfo', { state: 'absence' }),
      color: 'blue' as const,
    },
    {
      name: `2025 연말결산`,
      onClick: () => navigate('/yearClosingEvent/2025'),
      color: 'blue' as const,
    },
    {
      name: `${thisYear} 페널티`,
      onClick: () => {
        developmentMode
          ? navigate('/monthlyinfo', { state: 'penalty' })
          : alert('아직 준비중입니다!');
      },
      color: 'gray' as const,
    },
  ];

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <Section title="이달의 모임정보">
          <MonthBookClub yearMonthId={thisYearMonthId} />
        </Section>

        <Section title="다음달 모임책">
          <MonthBookClub yearMonthId={nextYearMonthId} />
          {+nextMonth === 12 && (
            <ChevronRightLinkBtn
              className="mt-3"
              to={`/bookclub/${thisYear}-12`}
              title="자세히보기"
            />
          )}
        </Section>

        <Section className="!my-10 grid w-full grid-cols-4 gap-4 max-sm:my-20 max-sm:grid-cols-2 max-sm:gap-2.5">
          {buttonList.map(({ name, onClick, color }) => (
            <SquareBtn
              key={name}
              name={`${name}`}
              className="h-fit w-full rounded-xl !px-0 py-4"
              color={color}
              handleClick={onClick}
            />
          ))}
        </Section>

        <Section
          title="한페이지 멤버들이 소개했던 책"
          titleBtn={<ChevronRightLinkBtn to="/recommendedBooks" />}
        >
          <RecommendedBookSwiperContainer />
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
