import { useLocation } from 'react-router-dom';
import { IBookClubInfo } from 'data/documentsAtom';
import { formattedYearMonth } from 'util/index';
import { Section } from './Home';
import Subtitle from 'components/atoms/Subtitle';
import HistoryClubBookBox from 'components/atoms/box/HistoryClubBookBox';
import TabBox from 'components/atoms/TabBox';
import RecommendedBookList from 'components/template/RecommendedBookList';
import ClubReviewList from 'components/template/ClubReviewList';
import MobileHeader from 'layout/mobile/MobileHeader';

type LocationState = { state: { document: IBookClubInfo } };

const BookClubHistoryDetail = () => {
  const {
    state: { document },
  } = useLocation() as LocationState;

  const { id } = document;

  return (
    <>
      <MobileHeader
        title={`${formattedYearMonth(id)}의 한페이지 모임`}
        backBtn
      />

      <main>
        <Section>
          <HistoryClubBookBox document={document} />
        </Section>

        <Section>
          <Subtitle title='발제문과 모임 정리 기록' />
          <TabBox yearMonthId={id} />
        </Section>

        <Section>
          <Subtitle title='멤버들이 소개한 책' />
          <RecommendedBookList yearMonthId={id} />
        </Section>

        <Section>
          <Subtitle title='모임 후기' />
          <ClubReviewList yearMonthId={id} />
        </Section>
      </main>
    </>
  );
};

export default BookClubHistoryDetail;
