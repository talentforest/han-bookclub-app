import { useEffect, useState } from 'react';

import { PiShootingStarFill } from 'react-icons/pi';
import { SwiperSlide } from 'swiper/react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { CHALLENGE } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { thisYear } from '@/utils';

import { BaseBookData, BookData, RereadingChallenge } from '@/types';

import MobileHeader from '@/layout/mobile/MobileHeader';

import ChallengeRereadingCard from '@/components/challenge/ChallengeRereadingCard';
import ChallengeRereadingModal from '@/components/challenge/ChallengeRereadingModal';
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
  const [selectedYear, setSelectedYear] = useState(thisYear);
  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  const [challengeList, setChallengeList] = useState([]);

  const [rereadingBook, setRereadingBook] = useState<BookData | null>(null);

  const [showAllChallengeUser, setShowAllChallengeUser] = useState(false);

  const memberList = useRecoilValue(allUsersAtom);

  function getTotalCounts(userData: any): number {
    if (!userData || typeof userData !== 'object') return 0;

    return Object.values(userData).reduce((sum, value) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'counts' in value &&
        typeof (value as any).counts === 'number'
      ) {
        return sum + (value as any).counts;
      }
      return sum;
    }, 0) as number;
  }

  const allChallengeList = memberList
    .map(({ id }) => {
      const matched = challengeList?.find(({ creatorId }) => creatorId === id);
      return matched || { creatorId: id };
    })
    .sort((a, b) => getTotalCounts(b) - getTotalCounts(a));

  // 챌린지 유저 랭크
  const rankedChallengeList = allChallengeList.reduce(
    (
      acc: {
        result: any[];
        prevTotal: number | null;
        currentRank: number;
        skipCount: number;
      },
      userData,
    ) => {
      const total = getTotalCounts(userData);

      const isSameAsPrev = total === acc.prevTotal;

      const nextRank = isSameAsPrev
        ? acc.currentRank
        : acc.currentRank + acc.skipCount;

      const updatedSkipCount = isSameAsPrev ? acc.skipCount + 1 : 1;

      const updatedUserData = {
        ...userData,
        rank: nextRank,
        totalCounts: total,
      };

      return {
        result: [...acc.result, updatedUserData],
        prevTotal: total,
        currentRank: nextRank,
        skipCount: updatedSkipCount,
      };
    },
    {
      result: [],
      prevTotal: null,
      currentRank: 1,
      skipCount: 0,
    },
  ).result;

  useEffect(() => {
    getCollection(`BookClub-${selectedYear}`, setClubByYear);
    getCollection(CHALLENGE, setChallengeList);
  }, [selectedYear]);

  const handleChangeYear = (year: string) => setSelectedYear(year);

  const clubBookList = clubByYear.filter(({ book }) => book.thumbnail !== '');

  const { showModal } = useHandleModal();

  const challengeModalOpen = (book?: BookData) => {
    showModal({
      element: <ChallengeRereadingModal selectedBook={selectedChallengeBook} />,
    });
    setRereadingBook(prevBook => book || prevBook);
  };

  const challengBookListByUser = challengeList.map(item => {
    const { creatorId, id, ...rest } = item;
    return rest;
  });

  const sortedChallengeByCounts = Object.entries(
    challengBookListByUser.reduce((acc, entry) => {
      Object.entries(entry as RereadingChallenge).forEach(([title, value]) => {
        if (!acc[title]) {
          acc[title] = {
            book: value.book,
            readers: 1,
            counts: value.counts || 0,
          };
        } else {
          acc[title].readers += 1;
          acc[title].counts += value.counts || 0;
        }
      });
      return acc;
    }, {}) as {
      [title in string]: {
        book: BaseBookData;
        readers: number;
        counts: number;
      };
    },
  )
    .sort((a, b) => {
      const readersDiff = b[1].readers - a[1].readers;
      if (readersDiff !== 0) return readersDiff;
      return b[1].counts - a[1].counts;
    })
    .map(([title, info]) => ({ [title]: info }));

  const intialChallengeBook = rereadingBook && {
    [rereadingBook.title]: {
      book: {
        authors: rereadingBook.authors,
        publisher: rereadingBook.publisher,
        thumbnail: rereadingBook.thumbnail,
        title: rereadingBook.title,
      },
      readers: 0,
      counts: 0,
    },
  };

  const selectedChallengeBook =
    sortedChallengeByCounts?.find(item => {
      const [title] = Object.entries(item)[0];
      return title === rereadingBook?.title;
    }) || intialChallengeBook;

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

        {sortedChallengeByCounts.length > 0 && (
          <Section className="!mb-20 !mt-16">
            <h4 className="mb-4 text-lg font-bold italic">
              🔥현재 가장 많이 재독한 도서는?
            </h4>

            <SwiperContainer options={swiperOptions}>
              {sortedChallengeByCounts.map((item, index) => {
                const [title, data] = Object.entries(item)[0];
                const { book, readers, counts } = data;

                return (
                  <SwiperSlide key={title}>
                    <li className="relative min-h-fit w-full pb-3">
                      <BookThumbnail
                        title={book.title}
                        thumbnail={book.thumbnail}
                        className="mx-auto w-full rounded-md max-sm:w-4/5"
                      />

                      <div className="absolute -bottom-4 right-0">
                        <PiShootingStarFill className="size-[90px] fill-yellow-400" />
                        <span className="absolute bottom-[42px] right-[27px] font-sans text-xl font-bold text-indigo-600">
                          {index + 1}
                        </span>
                      </div>

                      {/* <div className="mt-4 flex flex-wrap gap-2">
                      <Tag
                        text={`🙋🏻${readers}명의 멤버가 재독`}
                        color="lightBlue"
                        shape="rounded"
                        className="!py-1.5 text-sm !text-blue-600"
                      />
                      <Tag
                        text={`👀총 ${counts}번 재독`}
                        color="yellow"
                        shape="rounded"
                        className="!py-1.5 text-sm !text-green-600"
                      />
                    </div> */}
                    </li>
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
            handleChangeYear={handleChangeYear}
            buttonClassName="!px-3 h-9 min-h-9"
          />
          <p className="mt-4 text-sm text-gray1">
            책의 썸네일을 클릭한 후 재독 소감을 작성하면 재독수가 증가합니다!
            과연 누구의 재독 수가 가장 많을까요?!
          </p>
          <ul className="mt-5 grid grid-cols-11 max-md:grid-cols-7 max-sm:grid-cols-4 max-sm:gap-5">
            {clubBookList.map(({ book }) => (
              <li key={book.datetime}>
                <button
                  type="button"
                  onClick={() => challengeModalOpen(book)}
                  className="w-full"
                >
                  <BookThumbnail
                    title={book.title}
                    thumbnail={book.thumbnail}
                    className="w-full rounded-md shadow-card"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="!mt-10">
          <Subtitle title="개인별 챌린지 현황" />
          {rankedChallengeList?.length !== 0 && (
            <>
              <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-2">
                {rankedChallengeList
                  ?.slice(0, showAllChallengeUser ? undefined : 4)
                  .map(challenge => (
                    <ChallengeRereadingCard
                      key={challenge.creatorId}
                      userChallenge={challenge}
                      creatorId={challenge.creatorId}
                    />
                  ))}
              </ul>
              {!showAllChallengeUser && (
                <button
                  type="button"
                  className="mt-7 flex items-center self-center rounded-full bg-gray4 px-4 py-1.5 text-blue1"
                  onClick={() => setShowAllChallengeUser(true)}
                >
                  <span>순위 더보기</span>
                </button>
              )}
            </>
          )}
        </Section>
      </main>
    </>
  );
}
