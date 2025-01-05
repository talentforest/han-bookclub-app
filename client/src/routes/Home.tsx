import styled from 'styled-components';

import { thisMonth, thisYear } from 'util/index';

import useHandlePenalty from 'hooks/useHandlePenalty';

import Footer from 'layout/Footer';
import MobileHeader from 'layout/mobile/MobileHeader';

import GuideLine from 'components/atoms/GuideLine';
import LinkChevronRightBtn from 'components/atoms/button/LinkChevronRightBtn';
import Section from 'components/atoms/container/Section';
import BookClubNextMonthBox from 'components/molecules/BookClubNextMonthBox';
import PenaltyBox from 'components/molecules/PenaltyBox';
import AbsenceMemberTable from 'components/organisms/AbsenceMemberTable';
import BookFieldHostTable from 'components/organisms/BookFieldHostTable';
import ChallengeBookList from 'components/organisms/ChallengeBookList';
import RecommendedBooksByIdScrollBox from 'components/organisms/RecommendedBooksByIdScrollBox';
import ThisMonthBookClub from 'components/organisms/ThisMonthBookClub';
import VoteSlider from 'components/organisms/VoteSlider';
import AllowNotificationModalBox from 'components/organisms/modal/AllowNotificationModalBox';

const Home = () => {
  const { thisMonthSubjectDutyUsers, penaltyCostList } = useHandlePenalty();

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />

      <main>
        <Section title="이달의 한페이지">
          <GuideLine text="매월 1일에 업데이트 됩니다" />
          <ThisMonthBookClub />
          <BookClubNextMonthBox />
        </Section>

        <Section title={`${thisYear}년 개인별 챌린지`}>
          <ChallengeBookList />
          <LinkChevronRightBtn title="챌린지 더보기" to="/challenge" />
        </Section>

        <Section title="한페이지 멤버들이 소개했던 책">
          <RecommendedBooksByIdScrollBox />
        </Section>

        <Section title="투표함">
          <VoteSlider />
        </Section>

        <Section title="독서모임 한페이지 월별 정보">
          <TableContainer>
            <AbsenceMemberTable isMonth />
            <BookFieldHostTable isMonth />
          </TableContainer>
          <LinkChevronRightBtn title="월별 정보 더보기" to="/monthlyinfo" />
        </Section>

        <Section title="2024년 페널티 정보">
          <PenaltyBox
            title={`${+thisMonth}월 의무 발제 부과`}
            dutySubjectUsers={thisMonthSubjectDutyUsers}
          />
          <PenaltyBox
            title="누적 페널티비"
            totalCost={
              (penaltyCostList.overdueAbsenceMonths?.length +
                penaltyCostList.overdueSubjectMonths?.length) *
              7000
            }
          />
        </Section>
      </main>

      <Footer />

      <AllowNotificationModalBox />
    </>
  );
};

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Home;
