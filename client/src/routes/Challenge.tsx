import { useEffect, useState } from 'react';

import { getCollection } from 'api/firebase/getFbDoc';

import { ISearchedBook } from 'data/bookAtom';
import { ChallengeRereading } from 'data/challengeAtom';
import { clubByYearAtom } from 'data/clubAtom';
import { allUsersAtom } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { SwiperSlide } from 'swiper/react';
import { thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import ChallengeRereadingCard from 'components/challenge/ChallengeRereadingCard';
import ChallengeRereadingModal from 'components/challenge/ChallengeRereadingModal';
import DDay from 'components/common/DDay';
import SelectYearBtnList from 'components/common/SelectYearBtnList';
import Subtitle from 'components/common/Subtitle';
import BookThumbnail from 'components/common/book/BookThumbnail';
import Section from 'components/common/container/Section';
import SwiperContainer from 'components/common/container/SwiperContainer';

const swiperOptions = {
  slidesPerView: 'auto' as const,
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
  pagination: false,
  spaceBetween: 8,
  scrollbar: true,
  navigation: false,
  autoplay: true,
};

export default function Challenge() {
  const [selectedYear, setSelectedYear] = useState(thisYear);

  const [clubByYear, setClubByYear] = useRecoilState(clubByYearAtom);

  const [challengeList, setChallengeList] = useState([]);

  const [rereadingBook, setRereadingBook] = useState({
    isModalOpen: false,
    rereadingBook: null,
  });

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
      const matched = challengeList.find(({ creatorId }) => creatorId === id);
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

  const toggleModalOpen = (book?: ISearchedBook) =>
    setRereadingBook(prev => ({
      rereadingBook: book || prev.rereadingBook,
      isModalOpen: !prev.isModalOpen,
    }));

  // 챌린지에서 모든 유저의 챌린지 도서 정보를 가져와서 각각 합하면 되네.
  const challengBookListByUser = challengeList.map(item => {
    const { creatorId, id, ...rest } = item;
    return rest;
  });

  const reduced = challengBookListByUser.reduce((acc, entry) => {
    Object.entries(entry as ChallengeRereading).forEach(([title, value]) => {
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
  }, {});

  const sorted = Object.entries(
    reduced as {
      [title in string]: {
        books: ISearchedBook;
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

  console.log(sorted);

  return (
    <>
      <MobileHeader title={`${thisYear}년 개인별 챌린지`} backBtn />

      <main>
        <DDay
          hyphenDate={`${thisYear}-12-21`}
          className="mx-auto mb-10 mt-4 flex size-52 flex-col items-center justify-center rounded-full bg-pointCoral p-3 text-3xl font-bold shadow-xl max-sm:bg-red-400"
        />

        <div className="rounded-xl bg-white p-4">
          <h4 className="mb-1 mt-0.5 flex items-center gap-2">
            📚✨2025년 챌린지{' '}
            <div className="flex-1 border-t-2 border-dotted border-gray3" />
          </h4>
          <span className="font-bold">지난 독서모임 책 재독하기!</span>
        </div>

        <Section className="!mt-10">
          <h4 className="mb-4 text-lg font-bold italic">
            🔥현재 가장 많이 읽히고 있는 도서는?
          </h4>
          <SwiperContainer options={swiperOptions}>
            {clubBookList.map(({ book }) => (
              <SwiperSlide key={`${book.publisher}-${book.isbn}`}>
                <li
                  key={book.datetime}
                  className="mb-10 flex w-[300px] justify-between rounded-xl bg-white p-4 shadow-card"
                >
                  <BookThumbnail
                    title={book.title}
                    thumbnail={book.thumbnail}
                    className="mr-3 w-20 rounded-md"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <span className="mr-1 text-xl font-bold">
                      🏆 1<span className="pr-2 text-lg font-bold">위</span>
                      <span className="line-clamp-2 text-base font-normal text-gray1">
                        {book.title}
                      </span>
                    </span>

                    <div className="mt-1 flex flex-col gap-0.5">
                      <span className="block text-sm">재독 횟수</span>
                      <span className="block text-sm">재독한 멤버</span>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </Section>

        <Section>
          <Subtitle title="독서모임의 도서들" />
          <SelectYearBtnList
            selectedYear={selectedYear}
            handleChangeYear={handleChangeYear}
            buttonClassName="!px-3 h-9 min-h-9"
          />
          <p className="mt-4 text-sm text-gray1">
            아래 독서모임 도서들의 썸네일을 클릭한 후 재독 소감을 작성하면
            재독수가 증가합니다!
          </p>
          <ul className="mt-5 grid grid-cols-11 gap-5 rounded-xl bg-white p-3 shadow-card max-md:grid-cols-7 max-sm:grid-cols-4 max-sm:gap-5">
            {clubBookList.map(({ book }) => (
              <li key={book.datetime}>
                <button
                  type="button"
                  onClick={() => toggleModalOpen(book)}
                  className="w-full"
                >
                  <BookThumbnail
                    title={book.title}
                    thumbnail={book.thumbnail}
                    className="w-full rounded-md"
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

        {rereadingBook.isModalOpen && (
          <ChallengeRereadingModal
            rereadingBook={rereadingBook.rereadingBook}
            toggleOpen={toggleModalOpen}
          />
        )}
      </main>
    </>
  );
}
