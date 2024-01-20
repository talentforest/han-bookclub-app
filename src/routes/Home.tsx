import { thisYear } from 'util/index';
import Subtitle from 'components/atoms/Subtitle';
import GuideBox from 'components/atoms/GuideBox';
import BookFieldHostBox from 'components/organisms/home/BookFieldHostBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import RecommendedBooksScrollBox from 'components/organisms/home/RecommendedBooksScrollBox';
import ChallengeBookContainer from 'components/organisms/home/ChallengeBookContainer';
import ThisMonthClub from 'components/organisms/home/ThisMonthClub';
import MobileHeader from 'layout/mobile/MobileHeader';
import device from 'theme/mediaQueries';

const Home = () => {
  return (
    <>
      <MobileHeader title='독서모임 한페이지' />
      <main>
        <Section>
          <GuideBox text='매월 1일에 업데이트 됩니다' />
          <ThisMonthClub />
        </Section>

        <Section>
          <Subtitle title={`${thisYear}년 개인별 챌린지`} />
          <ChallengeBookContainer />
        </Section>

        <Section>
          <Subtitle title='투표함' />
          <VoteSlider />
        </Section>

        <Section>
          <Subtitle title='한페이지 멤버들이 소개했던 책' />
          <RecommendedBooksScrollBox />
        </Section>

        <Section>
          <Subtitle title={`${thisYear} 한페이지의 독서분야와 발제자`} />
          <BookFieldHostBox />
        </Section>
      </main>
    </>
  );
};

export const Section = styled.section`
  margin-bottom: 65px;
  @media ${device.tablet} {
    margin-bottom: 80px;
  }
  @media ${device.desktop} {
    margin-bottom: 80px;
  }
`;

export default Home;
