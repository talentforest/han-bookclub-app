import { thisYear } from 'util/index';
import Subtitle from 'components/atoms/Subtitle';
import Guide from 'components/atoms/Guide';
import BookFieldHostBox from 'components/organisms/home/BookFieldHostBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import RecommendedBooksScrollBox from 'components/organisms/home/RecommendedBooksScrollBox';
import ChallengeBookContainer from 'components/organisms/home/ChallengeBookContainer';
import ThisMonthClub from 'components/organisms/home/ThisMonthClub';

const Home = () => {
  return (
    <main>
      <Section>
        <Guide text='매월 1일에 업데이트 됩니다' />
        <ThisMonthClub />
      </Section>

      <Section>
        <Subtitle title={`${thisYear}년 개인별 챌린지`} />
        <ChallengeBookContainer />
      </Section>

      <Section>
        <Subtitle title={'한페이지의 투표함'} />
        <VoteSlider />
      </Section>

      <Section>
        <Subtitle title={`한페이지 멤버들의 추천책`} />
        <RecommendedBooksScrollBox />
      </Section>

      <Section>
        <Subtitle title={`${thisYear} 한페이지의 독서분야와 발제자`} />
        <BookFieldHostBox />
      </Section>
    </main>
  );
};

export const Section = styled.section`
  margin-bottom: 50px;
`;

export default Home;
