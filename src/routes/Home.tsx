import { useEffect, useState } from 'react';
import {
  thisYear,
  thisYearMonthIso,
  THIS_YEAR_BOOKCLUB,
  existDocObj,
  BOOK_FIELD_HOST,
  thisMonth,
} from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { thisMonthClubState } from 'data/documentsAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';

import Subtitle from 'components/atoms/Subtitle';
import Loading from 'components/atoms/loadings/Loading';
import Guide from 'components/atoms/Guide';
import BookFieldHostBox from 'components/organisms/home/BookFieldHostBox';
import VoteSlider from 'components/organisms/home/VoteSlider';
import styled from 'styled-components';
import ClubBookBox from 'components/atoms/box/ClubBookBox';
import HeaderBox from 'components/atoms/box/HeaderBox';
import ChallengeBookBox from 'components/atoms/box/ChallengeBookBox';

const Home = () => {
  const [thisYearHosts, setThisYearHosts] = useRecoilState(fieldHostDocState);
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);
  const [challengeBooks, setChallengeBook] = useState({
    id: '',
    challenge: [],
  });

  const { book, meeting } = thisMonthClub;

  useEffect(() => {
    if (!existDocObj(thisYearHosts)) {
      getDocument(BOOK_FIELD_HOST, `${thisYear}`, setThisYearHosts);
    }
    getDocument('Challenge', `${thisYear}`, setChallengeBook);
    if (thisYearMonthIso) {
      getDocument(THIS_YEAR_BOOKCLUB, `${thisYearMonthIso}`, setThisMonthClub);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const thisMonthHost = thisYearHosts.info?.find(
    ({ month }) => month === thisMonth
  );

  return !existDocObj(thisMonthClub) ? (
    <Loading />
  ) : (
    <main>
      <Section>
        <Guide text='매월 1일에 업데이트 됩니다.' />

        <ClubBookBox book={book} />

        <BoxesContainer>
          <HeaderBox
            header='이달의 발제자'
            creatorId={
              thisMonthHost?.hosts.join(', ') || '정해진 발제자가 없어요.'
            }
          />
          <HeaderBox header='모임 시간' meeting={meeting} />
          <HeaderBox header='모임 장소' meeting={meeting} />
        </BoxesContainer>
      </Section>

      <Section>
        <Subtitle title={`${thisYear}년 개인별 챌린지`} />

        {challengeBooks.challenge.map((challenge, index) => (
          <ChallengeBookBox key={index} challenge={challenge} />
        ))}
      </Section>

      <Section>
        <Subtitle title={`${thisYear} 한페이지의 독서분야와 발제자`} />

        <BookFieldHostBox />
      </Section>

      <Section>
        <Subtitle title={'한페이지의 투표함'} />
        <VoteSlider />
      </Section>
    </main>
  );
};

const Section = styled.section`
  margin-bottom: 60px;
`;

const BoxesContainer = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
`;

export default Home;
