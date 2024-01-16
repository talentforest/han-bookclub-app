import { useLocation } from 'react-router-dom';
import { IBookClubInfo } from 'data/documentsAtom';
import Subtitle from 'components/atoms/Subtitle';
import styled from 'styled-components';
import HistoryClubBookBox from 'components/atoms/box/HistoryClubBookBox';
import TabBox from 'components/atoms/TabBox';
import RecommendedBookList from 'components/template/RecommendedBookList';
import ClubReviewList from 'components/template/ClubReviewList';

type LocationState = { state: { document: IBookClubInfo } };

const BookClubHistoryDetail = () => {
  const {
    state: { document },
  } = useLocation() as LocationState;

  const { id } = document;

  return (
    <main>
      <HistoryClubBookBox document={document} />

      <Section>
        <Subtitle title='발제문과 발제자의 정리 기록' />
        <TabBox yearMonthId={id} />
      </Section>

      <Section>
        <Subtitle title='멤버들의 추천책' />
        <RecommendedBookList yearMonthId={id} />
      </Section>

      <Section>
        <Subtitle title='모임 후기' />
        <ClubReviewList yearMonthId={id} />
      </Section>
    </main>
  );
};

const Section = styled.section`
  margin-top: 40px;
`;

export default BookClubHistoryDetail;
