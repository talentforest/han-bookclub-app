import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { getCollection, getDocument } from 'api/firebase/getFbDoc';

import { absenceAtom, attendanceSelector } from 'data/absenceAtom';
import { IBookClub, clubByMonthSelector, clubByYearAtom } from 'data/clubAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from 'appConstants';
import { existDocObj, formatDate, thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import MemberListCard from 'components/absence/MemberListCard';
import BasicBookCard from 'components/bookCard/BasicBookCard';
import ThisMonthBookClub from 'components/bookClub/ThisMonthClub';
import GuideLine from 'components/common/GuideLine';
import Loading from 'components/common/Loading';
import Subtitle from 'components/common/Subtitle';
import SearchBookBtn from 'components/common/button/SearchBookBtn';
import Section from 'components/common/container/Section';
import MeetingReviewForm from 'components/post/MeetingReviewForm';
import MeetingReviewList from 'components/post/MeetingReviewList';
import PostTabBox from 'components/post/PostTabBox';
import RecommendedBookSwiperContainer from 'components/post/recommendedBooks/RecommendedBookSwiperContainer';

type LocationState = {
  state: {
    docId: string;
    docData?: IBookClub;
  };
};

const ClubDetail = () => {
  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const {
    state: { docId, docData },
  } = useLocation() as LocationState;

  const year = docId.slice(0, 4);
  const month = docId.slice(-2);

  const setAbsenceList = useSetRecoilState(absenceAtom);

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const { absenteeList, participantList } = useRecoilValue(
    attendanceSelector(+month),
  );

  useEffect(() => {
    if (!thisMonthClub) {
      getCollection(BOOKCLUB_THIS_YEAR, setThisYearClub);
    }
    getDocument(`BookClub-${year}`, ABSENCE_MEMBERS, setAbsenceList);
  }, [year]);

  const thisMonthDetail = docId === thisYearMonthId;

  return !existDocObj(docId) ? (
    <Loading />
  ) : (
    <>
      <MobileHeader
        title={`${thisMonthDetail ? '이달' : formatDate(docId, 'yyyy년 M월')}의 한페이지`}
        backBtn={!thisMonthDetail}
      />

      <main>
        <Section title="모임책과 모임정보">
          {thisMonthDetail ? (
            <ThisMonthBookClub />
          ) : (
            <BasicBookCard bookClub={docData} className="w-full" />
          )}
        </Section>

        {((thisMonthDetail && thisMonthClub) || !thisMonthDetail) && (
          <>
            <div className="grid grid-cols-5 gap-x-6 max-sm:flex max-sm:flex-col [&>section:first-child]:col-span-2 [&>section:last-child]:col-span-3">
              {absenteeList && (
                <Section>
                  <Subtitle title="참석 정보" />

                  <div className="flex flex-col gap-4">
                    <MemberListCard
                      title="참석 멤버"
                      memberList={participantList}
                    />
                    <MemberListCard
                      title="불참 멤버"
                      memberList={absenteeList}
                    />
                  </div>
                </Section>
              )}

              <Section>
                <Subtitle title="발제문과 정리 기록" />
                {thisMonthDetail && (
                  <GuideLine text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요." />
                )}
                <PostTabBox yearMonthId={docId} />
              </Section>
            </div>

            <Section>
              <Subtitle title={thisMonthDetail ? '책 추천하기' : '추천책'} />
              {thisMonthDetail && <SearchBookBtn />}
              <RecommendedBookSwiperContainer yearMonthId={docId} />
            </Section>

            <Section>
              <Subtitle title="모임 후기" />
              <div className="columns-2 max-sm:columns-1">
                {thisMonthDetail && <MeetingReviewForm docMonth={docId} />}
                <MeetingReviewList yearMonthId={docId} />
              </div>
            </Section>
          </>
        )}
      </main>
    </>
  );
};

export default ClubDetail;
