import { useNavigate } from 'react-router-dom';

import { thisYear } from 'utils';

import Footer from 'layout/Footer';
import MobileHeader from 'layout/mobile/MobileHeader';

import NextMonthClub from 'components/bookClub/NextMonthClub';
import ThisMonthBookClub from 'components/bookClub/ThisMonthClub';
import VoteSlider from 'components/bookVote/VoteSlider';
import SquareBtn from 'components/common/button/SquareBtn';
import Section from 'components/common/container/Section';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <div className="my-2.5 mb-16 grid grid-cols-3 gap-x-6 max-md:flex max-md:flex-col max-md:gap-y-16">
          <Section title="이달의 모임정보" className="col-span-2 !my-0">
            <ThisMonthBookClub />
          </Section>

          <Section title="다음달 모임책" className="col-span-1 !my-0 size-full">
            <NextMonthClub />
          </Section>
        </div>

        <Section className="!my-28 grid w-full grid-cols-2 gap-4 max-sm:my-20 max-sm:gap-2.5">
          <SquareBtn
            name={`${thisYear} 월별 독서분야`}
            className="h-fit w-full !px-0 py-3.5"
            color="darkBlue"
            handleClick={() =>
              navigate('/monthlyinfo', { state: 'fieldAndHost' })
            }
          />
          <SquareBtn
            name={`${thisYear} 모임불참`}
            className="py-4.5 h-fit w-full !px-0"
            color="darkBlue"
            handleClick={() => navigate('/monthlyinfo', { state: 'absence' })}
          />
          <SquareBtn
            name={`${thisYear} 챌린지`}
            className="h-fit w-full !px-0 py-3.5"
            color="gray"
            handleClick={() => alert('아직 준비중이에요!')}
          />
          <SquareBtn
            name={`${thisYear} 연말결산`}
            className="h-fit w-full !px-0 py-3.5"
            color="gray"
            handleClick={() => alert('아직 준비중이에요!')}
          />
        </Section>

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
