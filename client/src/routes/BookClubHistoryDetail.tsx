import { useLocation } from 'react-router-dom';

import { IBookClub } from 'data/bookClubAtom';

import { formatDate } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import BasicBookCard from 'components/bookCard/BasicBookCard';
import Section from 'components/common/container/Section';
import MeetingReviewList from 'components/post/MeetingReviewList';
import PostTabBox from 'components/post/PostTabBox';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

type LocationState = { state: { document: IBookClub } };

function BookClubHistoryDetail() {
  const {
    state: { document },
  } = useLocation() as LocationState;

  const { id } = document;

  return (
    <>
      <MobileHeader
        title={`${formatDate(id, 'yyyy년 MM월')}의 독서모임 한페이지`}
        backBtn
      />

      <main>
        <h1 className="mb-2 block pt-3 text-lg md:hidden">
          {formatDate(id, 'yyyy년 MM월')}의 독서모임 한페이지
        </h1>
        <BasicBookCard bookClub={document} className="mb-14 w-full" />

        <Section title="발제문과 모임정리기록">
          <PostTabBox yearMonthId={id} />
        </Section>

        <Section title="멤버들이 소개한 책">
          <RecommendedBookSwiperContainer yearMonthId={id} />
        </Section>

        <Section title="모임 후기">
          <div className="columns-2">
            <MeetingReviewList yearMonthId={id} />
          </div>
        </Section>
      </main>
    </>
  );
}

export default BookClubHistoryDetail;
