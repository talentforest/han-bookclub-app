import { useEffect } from 'react';
import {
  thisMonth,
  thisYear,
  thisYearMonthIso,
  THIS_YEAR_BOOKCLUB,
  existDocObj,
} from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { thisMonthClubState } from 'data/documentsAtom';
import Subtitle from 'components/atoms/Subtitle';
import BookImgTitle from 'components/atoms/BookImgTitle';
import Loading from 'components/atoms/Loading';
import Guide from 'components/atoms/Guide';
import FieldScheduleBox from 'components/organisms/home/FieldScheduleBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import ScheduleBox from 'components/organisms/ScheduleBox';
import BookLogoBox from 'components/organisms/home/BookLogo';

const Home = () => {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);
  const { book, meeting } = thisMonthClub;

  useEffect(() => {
    if (!existDocObj(thisMonthClub)) {
      getDocument(THIS_YEAR_BOOKCLUB, `${thisYearMonthIso}`, setThisMonthClub);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !existDocObj(thisMonthClub) ? (
    <Loading />
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
        <Subtitle title={`${thisYear} 한페이지의 독서 분야와 발제자`} />
        <BookLogoBox />
        <FieldScheduleBox />
      </Section>
      <Section>
        <Subtitle title={'한페이지의 투표함'} />
        <VoteSlider />
      </Section>
    </main>
  );
};

const Section = styled.section`
  margin-bottom: 70px;
`;

export default Home;
