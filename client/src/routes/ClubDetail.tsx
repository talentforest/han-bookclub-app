import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { absenceAtom, attendanceSelector } from '@/data/absenceAtom';
import { clubByMonthSelector, clubByYearAtom } from '@/data/clubAtom';

import { getCollection, getDocument } from '@/api';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { existDocObj, formatDate, thisYearMonthId } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import MemberListCard from '@/components/absence/MemberListCard';
import BasicBookCard from '@/components/bookCard/BasicBookCard';
import ThisMonthBookClub from '@/components/bookClub/ThisMonthClub';
import GuideLine from '@/components/common/GuideLine';
import LoopLoading from '@/components/common/LoopLoading';
import SearchBookBtn from '@/components/common/button/SearchBookBtn';
import Accordion from '@/components/common/container/Accordion';
import EmptyCard from '@/components/common/container/EmptyCard';
import Section from '@/components/common/container/Section';
import MeetingReviewList from '@/components/post/MeetingReviewList';
import PostTabBox from '@/components/post/PostTabBox';
import RecommendedBookSwiperContainer from '@/components/post/recommendedBooks/RecommendedBookSwiperContainer';

const ClubDetail = () => {
  const params = useParams();

  const yearMonthId = params?.id || thisYearMonthId;
  const year = yearMonthId.slice(0, 4);

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(yearMonthId));

  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const { absenteeList, participantList } = useRecoilValue(
    attendanceSelector(yearMonthId),
  );

  useEffect(() => {
    if (!monthlyBookClub) {
      getCollection(BOOKCLUB_THIS_YEAR, setThisYearClub);
    }
    if (!absenceList) {
      getDocument(`BookClub-${year}`, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [year]);

  const isThisMonthDetail = yearMonthId === thisYearMonthId;

  return (
    <>
      <MobileHeader
        title={`${isThisMonthDetail ? '이달' : formatDate(yearMonthId, 'yyyy년 M월')}의 한페이지`}
        backBtn={!isThisMonthDetail}
        backTo={'/previous-bookclub'}
      />

      {!existDocObj(yearMonthId) ? (
        <LoopLoading size={150} className="h-[80vh]" />
      ) : (
        <main>
          {!monthlyBookClub ? (
            <EmptyCard text="아직 생성된 모임이 없어요." />
          ) : (
            <>
              <Section title="모임 정보">
                {isThisMonthDetail ? (
                  <ThisMonthBookClub />
                ) : (
                  <BasicBookCard
                    bookClub={monthlyBookClub}
                    className="w-full"
                  />
                )}
              </Section>

              {((isThisMonthDetail && monthlyBookClub) ||
                !isThisMonthDetail) && (
                <>
                  <div className="grid grid-cols-5 gap-x-6 max-sm:flex max-sm:flex-col [&>section:first-child]:col-span-2 [&>section:last-child]:col-span-3">
                    {absenteeList && (
                      <Section title="참석 정보">
                        <div className="flex flex-col gap-4">
                          <MemberListCard
                            title={`참석 멤버 ${participantList.length}명`}
                            memberList={participantList}
                          />
                          <MemberListCard
                            title={`불참 멤버 ${absenteeList.length}명`}
                            memberList={absenteeList}
                          />
                        </div>
                      </Section>
                    )}

                    {monthlyBookClub?.book && (
                      <Section title="발제문과 정리 기록">
                        {isThisMonthDetail && (
                          <GuideLine text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요." />
                        )}
                        <PostTabBox yearMonthId={yearMonthId} />
                      </Section>
                    )}
                  </div>

                  {monthlyBookClub?.book && (
                    <Section
                      title={isThisMonthDetail ? '책 추천하기' : '추천책'}
                    >
                      {isThisMonthDetail && <SearchBookBtn />}
                      <RecommendedBookSwiperContainer
                        yearMonthId={yearMonthId}
                      />
                    </Section>
                  )}

                  {monthlyBookClub?.meeting?.eventMonth && (
                    <Section title="이벤트 콘텐츠">
                      <ul className="flex flex-col gap-y-3">
                        {monthlyBookClub.meeting.eventMonth.contents.map(
                          content => (
                            <Accordion key={content.id} title={content.title}>
                              <div className="mb-4">{content.detail}</div>
                            </Accordion>
                          ),
                        )}
                      </ul>
                    </Section>
                  )}

                  <Section title="모임 후기">
                    <MeetingReviewList yearMonthId={yearMonthId} />
                  </Section>
                </>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};

export default ClubDetail;
