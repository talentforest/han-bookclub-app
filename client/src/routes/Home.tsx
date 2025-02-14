import { useNavigate } from 'react-router-dom';

import { thisYear } from 'utils';

import Footer from 'layout/Footer';
import MobileHeader from 'layout/mobile/MobileHeader';

import NextMonthClub from 'components/bookClub/NextMonthClub';
import ThisMonthBookClub from 'components/bookClub/ThisMonthClub';
import VoteSlider from 'components/bookVote/VoteSlider';
import GuideLine from 'components/common/GuideLine';
import SquareBtn from 'components/common/button/SquareBtn';
import Section from 'components/common/container/Section';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

// 독서모임 정보
// 1. 멤버 (+불참 정보)
// 3. 독서모임 시작일
// 2. 독서분야와 발제자

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <Section title="이달의 모임정보">
          <GuideLine text="매월 1일에 업데이트 됩니다" />
          <ThisMonthBookClub />
        </Section>

        <Section title="다음달 모임책">
          <NextMonthClub />
        </Section>

        <div className="mb-16 grid w-full grid-cols-2 gap-4 max-sm:gap-2.5">
          <SquareBtn
            name={`${thisYear} 월별 독서분야`}
            className="w-full !px-0"
            color="darkBlue"
            handleClick={() =>
              navigate('/monthlyinfo', { state: 'fieldAndHost' })
            }
          />
          <SquareBtn
            name={`${thisYear} 모임불참`}
            className="w-full"
            color="darkBlue"
            handleClick={() => navigate('/monthlyinfo', { state: 'absence' })}
          />
          <SquareBtn
            name={`${thisYear} 챌린지`}
            className="w-full"
            color="gray"
            handleClick={() => alert('아직 준비중이에요!')}
          />
          <SquareBtn
            name={`${thisYear} 연말결산`}
            className="w-full"
            color="gray"
            handleClick={() => alert('아직 준비중이에요!')}
          />
        </div>

        <Section title="한페이지 멤버들이 소개했던 책">
          <RecommendedBookSwiperContainer />
        </Section>

        <Section title="다음 모임책 투표함">
          <VoteSlider />
        </Section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
