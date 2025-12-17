import { useMemo, useState } from 'react';

import { RECOMMENDED_BOOKS, months } from '@/appConstants';

import { useGetClubByYear, useHandleChallenge, useHandleModal } from '@/hooks';

import {
  formatDate,
  getDDay,
  getFbRouteOfPost,
  thisMonth,
  thisYear,
} from '@/utils';

import { BaseBookData } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import ChallengeBookRankCard from '@/components/challenge/ChallengeBookRankCard';
import ChallengeRecommendedBookListByMonth from '@/components/challenge/ChallengeRecommendedBookListByMonth';
import ChallengeRereadingModal from '@/components/challenge/ChallengeRereadingModal';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import SelectYearBtnList from '@/components/common/SelectYearBtnList';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';

export default function Challenge() {
  const [showAllUserRank, setShowAllUserRank] = useState(false);

  const { showModal } = useHandleModal();

  const { bookWithRankList, userRankList } = useHandleChallenge();

  const {
    selectedYear,
    setSelectedYear,
    clubBookListByYear, //
  } = useGetClubByYear();

  const recommendedBookCollNameList = useMemo(() => {
    const monthList =
      selectedYear === thisYear
        ? months.filter(month => +month <= +thisMonth)
        : months;

    return monthList.map(month => {
      return getFbRouteOfPost(`${selectedYear}-${month}`, RECOMMENDED_BOOKS);
    });
  }, [selectedYear]);

  const onChallengeBookClick = (
    book: BaseBookData & { yearMonthId?: string },
    reason?: string,
    recommendedUser?: string,
  ) => {
    const challengeBook = bookWithRankList.find(
      ({ title }) => title === book.title,
    );

    showModal({
      element: (
        <ChallengeRereadingModal
          selectedBook={challengeBook || book}
          readers={challengeBook?.readers || 0}
          counts={challengeBook?.counts || 0}
          reason={reason}
          recommendedUser={recommendedUser}
          yearMonthId={book.yearMonthId}
        />
      ),
    });
  };

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn backTo="/" />

      <main>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col justify-center gap-y-3 rounded-xl bg-white p-4 shadow-card">
            <h4 className="font-GiantsInline font-semibold leading-6 text-blue2">
              2025: Challenge
            </h4>
            <span className="font-RomanticGumi font-bold text-blue1">
              모임책과 추천책 다시 읽어보기
            </span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-card">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/dday.png`}
              alt="dday"
              className="aspect-auto h-7 w-fit"
            />

            <div className="mt-1 flex flex-col items-center">
              <span className="font-RomanticGumi text-[28px] text-blue2">
                {+getDDay(`${thisYear}-12-21`) > 0 ? '+' : ''}
                {getDDay(`${thisYear}-12-21`)}
              </span>
              <span className="font-RomanticGumi text-sm tracking-tighter text-gray2">
                {formatDate(`${thisYear}-12-21`, 'yy.M.d')}
              </span>
            </div>
          </div>
        </div>

        {bookWithRankList && bookWithRankList?.length > 0 && (
          <Section
            className="!mb-10 !mt-16 flex"
            title="🔥현재 가장 여러 번 다시 읽은 책은?"
          >
            <ul className="grid grid-cols-4 gap-4">
              {bookWithRankList.map(bookWithRank => (
                <ChallengeBookRankCard
                  key={bookWithRank.title}
                  bookWithRank={bookWithRank}
                />
              ))}
            </ul>
          </Section>
        )}

        <Section className="!mt-10" title="🙋🏻현재 멤버별 챌린지 현황">
          {userRankList?.length !== 0 && (
            <>
              <ul className="flex flex-col gap-y-3">
                {userRankList
                  ?.slice(0, showAllUserRank ? undefined : 4)
                  .map(userRank => (
                    <ChallengeUserRankCard
                      key={userRank.creatorId}
                      userRank={userRank}
                    />
                  ))}
              </ul>

              <button
                type="button"
                className="mt-7 flex items-center self-center rounded-full bg-gray4 px-6 py-2 text-sm text-blue3"
                onClick={() => setShowAllUserRank(prev => !prev)}
              >
                {!showAllUserRank ? '더보기' : '접기'}
              </button>
            </>
          )}
        </Section>

        <Section title="독서모임의 책들">
          <p className="mb-4 text-sm text-gray1">
            책의 썸네일을 클릭한 후 재독 소감을 작성하면 재독수가 증가합니다!
            과연 누구의 재독 수가 가장 많을까요?!
          </p>

          <SelectYearBtnList
            selectedYear={selectedYear}
            handleChangeYear={setSelectedYear}
            buttonClassName="shadow-none"
          />

          <ul className="mt-5 grid grid-cols-10 gap-4 max-md:grid-cols-8 max-sm:grid-cols-4 max-sm:gap-4">
            {clubBookListByYear.map(clubbook => (
              <li key={clubbook.title}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => onChallengeBookClick(clubbook)}
                >
                  <BookThumbnail
                    title={clubbook.title}
                    thumbnail={clubbook.thumbnail}
                  />
                </button>
              </li>
            ))}
            {recommendedBookCollNameList.map(coll => (
              <ChallengeRecommendedBookListByMonth
                key={coll}
                coll={coll}
                onChallengeBookClick={onChallengeBookClick}
              />
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}
