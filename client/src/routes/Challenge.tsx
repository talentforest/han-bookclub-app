import { useEffect, useMemo, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { rereadingChallengeAtom } from '@/data/challengeAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { CHALLENGE } from '@/appConstants';

import { useGetClubByYear, useHandleModal } from '@/hooks';

import { thisYear } from '@/utils';

import { BaseBookData, BookRank, UserRank } from '@/types';

import MobileHeader from '@/layout/mobile/MobileHeader';

import ChallengeBookRankCard from '@/components/challenge/ChallengeBookRankCard';
import ChallengeRereadingModal from '@/components/challenge/ChallengeRereadingModal';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import DDay from '@/components/common/DDay';
import SelectYearBtnList from '@/components/common/SelectYearBtnList';
import Subtitle from '@/components/common/Subtitle';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 3,
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
  loop: true,
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

  const bookRankList: BookRank[] = useMemo(() => {
    const usersBookList = userChallengeList
      .map(item => {
        const { creatorId, id, ...rest } = item;

        return Object.entries(rest).map(([_, { book, counts }]) => {
          return { ...book, counts };
        });
      })
      .flat();
    return Object.values(
      usersBookList.reduce<Record<string, BookRank>>((acc, book) => {
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
      if (prevScore === user.totalScore) {
        skip++;
      } else {
        rank = idx + 1 + skip;
        skip = 0;
      }
      prevScore = user.totalScore;

      const totalRereadingCounts = user.rereadingBookList.reduce(
        (acc, { counts }) => {
          return acc + counts;
        },
        0,
      );

      return {
        creatorId: user.creatorId,
        rank,
        rereadingBookList: user.rereadingBookList,
        totalRereadingCounts,
      };
    });
  }, [userChallengeList]);

  useEffect(() => {
    getCollection(CHALLENGE, setUserChallengeList);
  }, []);

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
            <span className="font-bold">독서모임의 책들 재독하기!</span>
          </div>

          <DDay
            hyphenDate={`${thisYear}-12-21`}
            className="flex flex-1 flex-col items-center justify-center rounded-xl bg-indigo-200 p-2 text-xl font-bold text-indigo-700 shadow-card"
          />
        </header>

        {bookRankList.length > 0 && (
          <Section className="!mb-20 !mt-16">
            <h4 className="mb-4 text-lg font-bold italic">
              🔥현재 가장 많이 재독한 도서는?
            </h4>

            <SwiperContainer options={swiperOptions}>
              {bookRankList.map((bookRank, index) => {
                return (
                  <SwiperSlide key={bookRank.title}>
                    <ChallengeBookRankCard
                      bookRank={bookRank}
                      rank={index + 1}
                    />
                  </SwiperSlide>
                );
              })}
            </SwiperContainer>
          </Section>
        )}

        <Section>
          <Subtitle title="독서모임의 도서들" />
          <SelectYearBtnList
            selectedYear={selectedYear}
            handleChangeYear={setSelectedYear}
            buttonClassName="!px-3 h-9 min-h-9"
          />
          <p className="mt-4 text-sm text-gray1">
            책의 썸네일을 클릭한 후 재독 소감을 작성하면 재독수가 증가합니다!
            과연 누구의 재독 수가 가장 많을까요?!
          </p>
          <ul className="mt-5 grid grid-cols-11 max-md:grid-cols-7 max-sm:grid-cols-4 max-sm:gap-5">
            {clubBookListByYear.map(clubbook => (
              <li key={clubbook.datetime}>
                <button
                  type="button"
                  className="w-full"
                  onClick={() =>
                    showModal({
                      element: (
                        <ChallengeRereadingModal
                          selectedBook={clubbook}
                          readers={0}
                          counts={0}
                        />
                      ),
                    })
                  }
                >
                  <BookThumbnail
                    title={clubbook.title}
                    thumbnail={clubbook.thumbnail}
                    className="w-full rounded-md shadow-card"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="!mt-10">
          <Subtitle title="개인별 챌린지 현황" />
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
                className="mt-7 flex items-center self-center rounded-full bg-gray4 px-4 py-1.5 text-blue1"
                onClick={() => setShowAllRank(prev => !prev)}
              >
                <span>{!showAllRank ? '순위 더보기' : '접기'}</span>
              </button>
            </>
          )}
        </Section>
      </main>
    </>
  );
}
