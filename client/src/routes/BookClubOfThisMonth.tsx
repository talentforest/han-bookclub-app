import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { thisYearMonthId, thisYear, existDocObj } from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { BOOK_FIELD_HOST, THIS_YEAR_BOOKCLUB } from 'constants/index';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import GuideLine from 'components/atoms/GuideLine';
import ThisMonthClub from 'components/organisms/ThisMonthBookClub';
import PostTabBox from 'components/organisms/PostTabBox';
import MeetingReviewList from 'components/organisms/MeetingReviewList';
import MeetingReviewForm from 'components/organisms/MeetingReviewForm';
import SearchBookBtn from 'components/atoms/button/SearchBookBtn';
import RecommendedBookScrollList from 'components/organisms/RecommendedBookScrollList';
import MobileHeader from 'layout/mobile/MobileHeader';

import AbsenceMemberTable from 'components/organisms/AbsenceMemberTable';
import Section from 'components/atoms/container/Section';

const BookClubOfThisMonth = () => {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(
    thisMonthBookClubState
  );
  const [fieldsHostDoc, setFieldsHostDoc] = useRecoilState(fieldHostDocState);

  const { id } = thisMonthClub;

  useEffect(() => {
    if (!existDocObj(fieldsHostDoc)) {
      getDocument(BOOK_FIELD_HOST, `${thisYear}`, setFieldsHostDoc);
    }
    if (!existDocObj(thisMonthClub)) {
      getDocument(THIS_YEAR_BOOKCLUB, thisYearMonthId, setThisMonthClub);
    }
  }, [setThisMonthClub, fieldsHostDoc]);

  return !existDocObj(thisMonthClub) ? (
    <Loading />
  ) : (
    thisMonthClub && (
      <>
        <MobileHeader title='이달의 독서모임 한페이지' />
        <main>
          <Section>
            <ThisMonthClub />
          </Section>

          <Section>
            <Subtitle title='이달의 불참 멤버' />
            <AbsenceMemberTable />
          </Section>

          <Section>
            <Subtitle title='발제문과 정리 기록' />
            <GuideLine text='모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요.' />
            <PostTabBox yearMonthId={id} />
          </Section>

          <Section>
            <Subtitle title='책 추천하기' />
            <SearchBookBtn />
            <RecommendedBookScrollList />
          </Section>

          <Section>
            <Subtitle title='모임 후기' />
            <MeetingReviewForm docMonth={thisYearMonthId} />
            <MeetingReviewList />
          </Section>
        </main>
      </>
    )
  );
};

export default BookClubOfThisMonth;
