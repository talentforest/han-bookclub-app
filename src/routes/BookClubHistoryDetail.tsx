import { useLocation } from 'react-router-dom';
import { IBookClub } from 'data/bookClubAtom';
import { formatKRMarkDate } from 'util/index';
import { Section } from './Home';
import Subtitle from 'components/atoms/Subtitle';
import HistoryClubBookBox from 'components/molecules/book-box/HistoryClubBookBox';
import TabBox from 'components/organisms/TabBox';
import RecommendedBookList from 'components/organisms/RecommendedBookList';
import ClubReviewList from 'components/organisms/ClubReviewList';
import MobileHeader from 'layout/mobile/MobileHeader';

type LocationState = { state: { document: IBookClub } };

const BookClubHistoryDetail = () => {
  const {
    state: { document },
  } = useLocation() as LocationState;

  const { id } = document;

  return (
    <>
      <MobileHeader
        title={`${formatKRMarkDate(id, 'YY년 MM월')}의 한페이지 모임`}
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
