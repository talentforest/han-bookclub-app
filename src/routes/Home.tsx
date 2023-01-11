import { useEffect } from 'react';
import {
  BOOK_FIELD,
  CLUB_INFO,
  thisMonth,
  thisYear,
  thisYearMonthIso,
  USER_DATA,
} from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  bookFieldsState,
  thisMonthState,
  votesState,
} from 'data/documentsAtom';
import Subtitle from 'components/atoms/Subtitle';
import BookImgTitle from 'components/atoms/BookImgTitle';
import Loading from 'components/atoms/Loading';
import Guide from 'components/atoms/Guide';
import FieldScheduleBox from 'components/organisms/home/FieldScheduleBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import ScheduleBox from 'components/organisms/ScheduleBox';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { authService } from 'fbase';
import { usersState } from 'data/userAtom';

interface PropsType {
  isLoggedIn: boolean;
}

const Home = ({ isLoggedIn }: PropsType) => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const setBookFields = useSetRecoilState(bookFieldsState);
  const setUserDocs = useSetRecoilState(usersState);
  const setVotes = useSetRecoilState(votesState);
  const checkThisMonthDoc = Object.keys(thisMonthDoc).length;
  const { book, meeting } = thisMonthDoc;

  useEffect(() => {
    if (!isLoggedIn) {
      try {
        signInAnonymously(authService);
        onAuthStateChanged(authService, (user) => {
          if (user) {
            console.log('success');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    getCollection(USER_DATA, setUserDocs);
    getDocument(CLUB_INFO, `${thisYearMonthIso}`, setThisMonthDoc);
    getDocument(BOOK_FIELD, `${thisYear}`, setBookFields);
    getCollection('Vote', setVotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return checkThisMonthDoc === 0 ? (
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
      <VoteSection>
        <Subtitle title={'한페이지의 투표함'} />
        <VoteSlider />
      </VoteSection>
      <FieldScheduleBox />
    </main>
  );
};

const Section = styled.section`
  margin-bottom: 60px;
`;
const VoteSection = styled(Section)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  .slick-list {
    padding-bottom: 3px;
  }
  .slick-slider {
    margin: 0 -10px;
  }
  .slick-slide {
    padding: 0 10px;
  }
`;

export default Home;
