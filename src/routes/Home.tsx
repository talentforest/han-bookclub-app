import { thisYear } from 'util/index';
import Subtitle from 'components/atoms/Subtitle';
import GuideLine from 'components/atoms/GuideLine';
import BookFieldHostTable from 'components/organisms/BookFieldHostTable';
import VoteSlider from 'components/organisms/VoteSlider';
import styled from 'styled-components';
import RecommendedBooksByIdScrollBox from 'components/organisms/RecommendedBooksByIdScrollBox';
import ChallengeBookList from 'components/organisms/ChallengeBookList';
import ThisMonthBookClub from 'components/organisms/ThisMonthBookClub';
import MobileHeader from 'layout/mobile/MobileHeader';
import device from 'theme/mediaQueries';
import BookClubNextMonthBox from 'components/molecules/BookClubNextMonthBox';
import AbsenceMemberTable from 'components/organisms/AbsenceMemberTable';
import Footer from 'layout/Footer';
import LinkChevronRightBtn from 'components/atoms/LinkChevronRightBtn';

const Home = () => {
  return (
    <>
      <MobileHeader title='독서모임 한페이지' />
      <main>
        <Section>
          <GuideLine text='매월 1일에 업데이트 됩니다' />
          <ThisMonthBookClub />
          <BookClubNextMonthBox />
        </Section>

        <Section>
          <Subtitle title={`${thisYear} 한페이지 독서모임 정보`} />
          <TableContainer>
            <BookFieldHostTable />
            <AbsenceMemberTable />
          </TableContainer>
          <LinkChevronRightBtn title='독서모임 정보 더보기' to='/bookshelf' />
        </Section>

        <Section>
          <Subtitle title={`${thisYear}년 개인별 챌린지`} />
          <ChallengeBookList />
          <LinkChevronRightBtn title='챌린지 더보기' to='/challenge' />
        </Section>

        <Section>
          <Subtitle title='한페이지 멤버들이 소개했던 책' />
          <RecommendedBooksByIdScrollBox />
        </Section>

        <Section>
          <Subtitle title='투표함' />
          <VoteSlider />
        </Section>

        <Section>
          <Subtitle title={`${thisYear} 한페이지의 독서분야와 발제자`} />
        </Section>
      </main>

      <Footer />
    </>
  );
};

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 65px;
  @media ${device.tablet} {
    margin-bottom: 80px;
  }
  @media ${device.desktop} {
    margin-bottom: 80px;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default Home;
