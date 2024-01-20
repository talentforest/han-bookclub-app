import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { thisMonthClubState } from 'data/documentsAtom';
import {
  thisYearMonthId,
  thisYear,
  BOOK_FIELD_HOST,
  THIS_YEAR_BOOKCLUB,
  existDocObj,
} from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { Section } from './Home';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import GuideBox from 'components/atoms/GuideBox';
import ThisMonthClub from 'components/organisms/home/ThisMonthClub';
import TabBox from 'components/atoms/TabBox';
import ClubReviewList from 'components/template/ClubReviewList';
import CreateClubReviewBox from 'components/atoms/box/CreateClubReviewBox';
import SearchRecommendBookBtn from 'components/organisms/bookclubthismonth/SearchRecommendBookBtn';
import RecommendedBookList from 'components/template/RecommendedBookList';
import MobileHeader from 'layout/mobile/MobileHeader';

const BookClubOfThisMonth = () => {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);
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
        <MobileHeader title='이달의 한페이지 모임' />
        <main>
          <Section>
            <ThisMonthClub />
            <GuideBox text='모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요.' />
          </Section>

          <Section>
            <Subtitle title='발제문과 정리 기록' />
            <TabBox yearMonthId={id} />
          </Section>

          <Section>
            <Subtitle title='책 추천하기' />
            <SearchRecommendBookBtn />
            <RecommendedBookList />
          </Section>

          <Section>
            <Subtitle title='모임 후기' />
            <CreateClubReviewBox docMonth={thisYearMonthId} />
            <ClubReviewList />
          </Section>
        </main>
      </>
    )
  );
};

export default BookClubOfThisMonth;
