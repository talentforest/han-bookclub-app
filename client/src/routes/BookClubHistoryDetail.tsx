import { useLocation } from 'react-router-dom';
import { IBookClub } from 'data/bookClubAtom';
import { formatKRMarkDate } from 'util/index';
import { Section } from './Home';
import Subtitle from 'components/atoms/Subtitle';
import BookClubHistoryBox from 'components/molecules/BookClubHistoryBox';
import PostTabBox from 'components/organisms/PostTabBox';
import RecommendedBookScrollList from 'components/organisms/RecommendedBookScrollList';
import MeetingReviewList from 'components/organisms/MeetingReviewList';
import MobileHeader from 'layout/mobile/MobileHeader';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type LocationState = { state: { document: IBookClub } };

const BookClubHistoryDetail = () => {
  const {
    state: { document },
  } = useLocation() as LocationState;

  const { id } = document;

  return (
    <>
      <MobileHeader
        title={`${formatKRMarkDate(id, 'YY년 MM월')}의 독서모임 한페이지`}
        backBtn
      />

      <main>
        <DeskTopTitle>
          {formatKRMarkDate(id, 'YY년 MM월')}의 독서모임 한페이지
        </DeskTopTitle>

        <Section>
          <BookClubHistoryBox document={document} />
        </Section>

        <Section>
          <Subtitle title='발제문과 모임 정리 기록' />
          <PostTabBox yearMonthId={id} />
        </Section>

        <Section>
          <Subtitle title='멤버들이 소개한 책' />
          <RecommendedBookScrollList yearMonthId={id} />
        </Section>

        <Section>
          <Subtitle title='모임 후기' />
          <MeetingReviewList yearMonthId={id} />
        </Section>
      </main>
    </>
  );
};

const DeskTopTitle = styled.h1`
  display: none;
  @media ${device.tablet} {
    font-size: 17px;
    display: block;
    margin: 0 0 10px 4px;
    color: ${({ theme }) => theme.text.gray4};
  }
`;

export default BookClubHistoryDetail;
