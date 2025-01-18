import { useEffect } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { absenceListState } from 'data/absenceAtom';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { allUsersState } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ABSENCE_MEMBERS,
  BOOKCLUB_THIS_YEAR,
  BOOK_FIELD_AND_HOST,
} from 'appConstants';
import { existDocObj, thisMonth, thisYear, thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

// import AbsenceMemberTable from 'components/absence/AbsenceMemberTable';
import MemberListCard from 'components/absence/MemberListCard';
import ThisMonthBookClub from 'components/bookClub/ThisMonthBookClub';
import GuideLine from 'components/common/GuideLine';
import Loading from 'components/common/Loading';
import Subtitle from 'components/common/Subtitle';
import SearchBookBtn from 'components/common/button/SearchBookBtn';
import Section from 'components/common/container/Section';
import MeetingReviewForm from 'components/post/MeetingReviewForm';
import MeetingReviewList from 'components/post/MeetingReviewList';
import PostTabBox from 'components/post/PostTabBox';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

const BookClubOfThisMonth = () => {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(
    thisMonthBookClubState,
  );
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);

  const [fieldsHostDoc, setFieldsHostDoc] = useRecoilState(fieldHostDocState);

  const allMemberList = useRecoilValue(allUsersState);

  const { id } = thisMonthClub;

  useEffect(() => {
    if (!existDocObj(fieldsHostDoc)) {
      getDocument(
        `BookClub-${thisYear}`,
        BOOK_FIELD_AND_HOST,
        setFieldsHostDoc,
      );
    }
    if (!existDocObj(thisMonthClub)) {
      getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthClub);
    }
  }, [setThisMonthClub, fieldsHostDoc]);

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  const thisMonthAbsentee = absenceList?.absenceMembers?.find(
    ({ month }) => month === +thisMonth,
  );

  const thisMonthAbsenteeList = thisMonthAbsentee && [
    ...thisMonthAbsentee?.breakMembers,
    ...thisMonthAbsentee?.onceAbsenceMembers,
  ];

  const thisMonthParticipantList = allMemberList
    .filter(member => !thisMonthAbsenteeList?.includes(member.id))
    .map(member => member.id);

  return !existDocObj(thisMonthClub) ? (
    <Loading />
  ) : (
    thisMonthClub && (
      <>
        <MobileHeader title="이달의 독서모임 한페이지" />
        <main>
          <Section title="이달의 한페이지">
            <ThisMonthBookClub />
          </Section>

          <div className="grid grid-cols-5 gap-x-6 sm:flex sm:flex-col [&>section:first-child]:col-span-2 [&>section:last-child]:col-span-3">
            <Section>
              <Subtitle title="이달의 참석 현황" />
              {thisMonthAbsentee && (
                <div className="flex flex-col gap-4">
                  <MemberListCard
                    title="참석 멤버"
                    memberList={thisMonthParticipantList}
                  />
                  <MemberListCard
                    title="불참 멤버"
                    memberList={thisMonthAbsenteeList}
                  />
                </div>
              )}
            </Section>

            <Section>
              <Subtitle title="발제문과 정리 기록" />
              <GuideLine text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요." />
              <PostTabBox yearMonthId={id} />
            </Section>
          </div>

          <Section>
            <Subtitle title="책 추천하기" />
            <SearchBookBtn />
            <RecommendedBookSwiperContainer yearMonthId={thisYearMonthId} />
          </Section>

          <Section>
            <Subtitle title="모임 후기" />
            <div className="columns-2 sm:columns-1">
              <MeetingReviewForm docMonth={thisYearMonthId} />
              <MeetingReviewList />
            </div>
          </Section>
        </main>
      </>
    )
  );
};

export default BookClubOfThisMonth;
