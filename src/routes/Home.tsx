import { useEffect } from 'react';
import { thisMonth, thisYear, thisYearMonthIso } from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { clubInfoByMonthState, votesState } from 'data/documentsAtom';
import Subtitle from 'components/atoms/Subtitle';
import BookImgTitle from 'components/atoms/BookImgTitle';
import Loading from 'components/atoms/Loading';
import Guide from 'components/atoms/Guide';
import FieldScheduleBox from 'components/organisms/home/FieldScheduleBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import ScheduleBox from 'components/organisms/ScheduleBox';
import device from 'theme/mediaQueries';

const Home = () => {
  const [thisMonthClub, setThisMonthClub] =
    useRecoilState(clubInfoByMonthState);
  const setVotes = useSetRecoilState(votesState);
  const checkThisMonthDoc = Object.keys(thisMonthClub).length;
  const { book, meeting } = thisMonthClub;

  useEffect(() => {
    getDocument(
      `BookClub-${thisYear}`,
      `${thisYearMonthIso}`,
      setThisMonthClub
    );
    getCollection('Vote', setVotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return checkThisMonthDoc === 0 ? (
    <Loading full />
  ) : (
    <main>
      <Section>
        <Subtitle title={`${thisMonth}월의 책`} />
        <Guide text='이달의 책은 매월 1일에 업데이트 됩니다.' />
        <BookImgTitle thumbnail={book?.thumbnail} title={book?.title} />
      </Section>
      <Section>
        <Subtitle title={`${thisMonth}월의 모임 일정`} />
        <Guide text='한페이지 멤버는 매월 셋째주 일요일에 만나요.' />
        <ScheduleBox schedule={meeting} />
      </Section>
      <Section>
        <Subtitle title={'한페이지의 투표함'} />
        <VoteSlider />
      </Section>
      <FieldScheduleBox />
    </main>
  );
};

const Section = styled.section`
  margin-bottom: 70px;
  @media ${device.tablet} {
    margin-bottom: 100px;
  }
`;

export default Home;
