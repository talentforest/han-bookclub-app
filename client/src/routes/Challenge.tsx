import { useEffect, useMemo, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { rereadingChallengeAtom } from '@/data/challengeAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { CHALLENGE, RECOMMENDED_BOOKS, months } from '@/appConstants';

import { useGetClubByYear, useHandleModal } from '@/hooks';

import { getFbRouteOfPost, thisMonth, thisYear } from '@/utils';

import { BaseBookData, BookData, BookWithRank, UserRank } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import ChallengeBookRankCard from '@/components/challenge/ChallengeBookRankCard';
import ChallengeRecommendedBookListByMonth from '@/components/challenge/ChallengeRecommendedBookListByMonth';
import ChallengeRereadingModal from '@/components/challenge/ChallengeRereadingModal';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import DDay from '@/components/common/DDay';
import SelectYearBtnList from '@/components/common/SelectYearBtnList';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 8,
    },
    800: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 2,
    },
  },
  pagination: true,
  navigation: false,
  scrollbar: false,
  spaceBetween: 4,
};

export default function Challenge() {
  const memberList = useRecoilValue(allUsersAtom);

  const [userChallengeList, setUserChallengeList] = useRecoilState(
    rereadingChallengeAtom,
  );

  const [showAllRank, setShowAllRank] = useState(false);

  const { showModal } = useHandleModal();

  const {
    selectedYear,
    setSelectedYear,
    clubBookListByYear, //
  } = useGetClubByYear();

  // 책 순위
  const bookWithRankList: BookWithRank[] = useMemo(() => {
    if (!userChallengeList) return null;

    const usersBookList = userChallengeList
      .map(item => {
        const { creatorId, id, ...rest } = item;

        return Object.entries(rest).map(
          ([_, { book, counts, impressionList }]) => {
            return {
              ...book,
              counts,
              id,
              impressionList: impressionList.map(item => ({
                ...item,
                creatorId,
              })),
            };
          },
        );
      })
      .flat();

    return Object.values(
      usersBookList.reduce<Record<string, BookWithRank>>((acc, book) => {
        const { title, counts } = book;

        if (!acc[title]) {
          acc[title] = { ...book, readers: 1 };
        } else {
          acc[title].counts += counts;
          acc[title].readers += 1;
        }

        return acc;
      }, {}),
    ).sort((a, b) => {
      const readersDiff = b.readers - a.readers;
      if (readersDiff !== 0) return readersDiff;
      return b.counts - a.counts;
    });
  }, [userChallengeList]);

  // 유저 순위
  const userRankList: UserRank[] = useMemo(() => {
    const memberChallengeList = memberList.map(({ id }) => {
      const matched = userChallengeList?.find(
        ({ creatorId }) => creatorId === id,
      );
      return matched || { id, creatorId: id };
    });

    const usersWithCounts = memberChallengeList
      .map(user => {
        const rereadingBookList: ({ counts: number } & BaseBookData)[] =
          Object.entries(user)
            .filter(([key]) => key !== 'id' && key !== 'creatorId')
            .map(([_, value]: any) => ({
              ...value.book,
              counts: value.counts,
            }));

        const totalScore = rereadingBookList.reduce(
          (acc, cur) => acc + cur.counts,
          0,
        );

        return {
          creatorId: user.creatorId,
          totalScore,
          rereadingBookList,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    // rank 계산 (동점자 처리)
    let rank = 0;
    let prevScore = -1;
    let skip = 0;

    return usersWithCounts.map((user, idx) => {
      const { rereadingBookList, creatorId, totalScore } = user;

      if (prevScore === totalScore) {
        skip++;
      } else {
        rank = idx + 1 + skip;
        skip = 0;
      }
      prevScore = totalScore;

      const totalRereadingCounts = rereadingBookList.reduce(
        (acc, { counts }) => {
          return acc + counts;
        },
        0,
      );

      return { creatorId, rank, rereadingBookList, totalRereadingCounts };
    });
  }, [userChallengeList]);

  useEffect(() => {
    if (!userChallengeList) {
      getCollection(CHALLENGE, setUserChallengeList);
    }
  }, []);

  const monthList =
    selectedYear === thisYear
      ? months.filter(month => +month <= +thisMonth)
      : months;

  const collList = monthList.map(month => {
    return getFbRouteOfPost(`${selectedYear}-${month}`, RECOMMENDED_BOOKS);
  });

  const onChallengeBookClick = (
    book: (BookData | BaseBookData) & { yearMonthId?: string },
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
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <header className="mb-10 mt-2 flex gap-x-3">
          <div className="rounded-xl bg-white p-4 shadow-card">
            <h4 className="mb-3.5 flex items-center gap-2">
              📚✨2025년 챌린지{' '}
              <div className="flex-1 border-t-2 border-dotted border-gray3" />
            </h4>
            <span className="font-bold">독서모임의 책들을 다시 읽어보기!</span>
          </div>

          <DDay
            hyphenDate={`${thisYear}-12-21`}
            className="flex w-44 flex-col items-center justify-center rounded-xl bg-indigo-200 p-2 text-xl font-bold text-indigo-700 shadow-card"
          />
        </header>

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

          <ul className="mt-5 grid grid-cols-10 gap-4 max-md:grid-cols-7 max-sm:grid-cols-4 max-sm:gap-4">
            {clubBookListByYear.map(clubbook => (
              <li key={clubbook.datetime}>
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
            {collList.map(coll => (
              <ChallengeRecommendedBookListByMonth
                key={coll}
                coll={coll}
                onChallengeBookClick={onChallengeBookClick}
              />
            ))}
          </ul>
        </Section>

        {bookWithRankList && bookWithRankList?.length > 0 && (
          <Section
            className="!mb-10 !mt-16"
            title="🔥현재 가장 여러 번 다시 읽은 책은?"
          >
            <SwiperContainer options={swiperOptions}>
              {bookWithRankList.map((bookWithRank, index) => {
                return (
                  <SwiperSlide key={bookWithRank.title}>
                    <ChallengeBookRankCard
                      bookWithRank={bookWithRank}
                      rank={index + 1}
                    />
                  </SwiperSlide>
                );
              })}
            </SwiperContainer>
          </Section>
        )}

        <Section className="!mt-10" title="🙋🏻현재 멤버별 챌린지 현황">
          {userRankList?.length !== 0 && (
            <>
              <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-2">
                {userRankList
                  ?.slice(0, showAllRank ? undefined : 4)
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
                onClick={() => setShowAllRank(prev => !prev)}
              >
                {!showAllRank ? '더보기' : '접기'}
              </button>
            </>
          )}
        </Section>
      </main>
    </>
  );
}
