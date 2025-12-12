import { ReactNode, useMemo, useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { useGetClubByYear, useHandleChallenge } from '@/hooks';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceRankList from '@/components/absence/AbsenceRankList';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import Confetti from '@/components/common/container/Confetti';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import UserImgName from '@/components/common/user/UserImgName';
import BestBookList from '@/components/event/BestBookList';
import BestSubjectList from '@/components/event/BestSubjectList';
import ReadingLifeQuestionList from '@/components/event/ReadingLifeQuestionList';

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 11,
    },
    800: {
      slidesPerView: 8,
    },
    500: {
      slidesPerView: 7,
    },
    320: {
      slidesPerView: 4,
    },
  },
  loop: true,
  centeredSlides: true,
  spaceBetween: 5,
  navigation: false,
  pagination: false,
  scrollbar: false,
  speed: 100,
};

export default function YearClosingDetail() {
  const [currTab, setCurrTab] = useState('개근상');

  const { meeting } = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const { clubBookListByYear } = useGetClubByYear();

  const { userRankList } = useHandleChallenge();

  const findCurrContent = useMemo(() => {
    const contentList = meeting.eventMonth.contents.filter(
      content => content.result,
    );
    return contentList.find(content => content.title.includes(currTab));
  }, [currTab]);

  const contentObj: {
    [key in string]: {
      name: string;
      result: ReactNode;
    };
  } = {
    개근상: {
      name: '독서모임 개근상',
      result: <AbsenceRankList />,
    },
    챌린지: {
      name: '재독 챌린지',
      result: (
        <>
          <Confetti className="flex justify-center gap-x-4 py-10">
            {userRankList
              .filter(({ rank }) => rank === 1)
              .map(user => (
                <UserImgName
                  key={user.creatorId}
                  className="flex aspect-square size-24 flex-col items-center justify-center rounded-2xl bg-white p-4 text-base shadow-card [&>img]:size-10"
                  userId={user.creatorId}
                />
              ))}
          </Confetti>

          <ul className="flex flex-col gap-y-3">
            {userRankList.map(userRank => (
              <ChallengeUserRankCard
                key={userRank.creatorId}
                userRank={userRank}
              />
            ))}
          </ul>
        </>
      ),
    },
    모임책: {
      name: '최고의 모임책',
      result: <BestBookList books={findCurrContent.result.books} />,
    },
    발제문: {
      name: '최고의 발제문',
      result: <BestSubjectList subjects={findCurrContent.result.subjects} />,
    },
    독서생활: {
      name: '독서생활을 돌아보는 질문',
      result: (
        <ReadingLifeQuestionList
          questionList={findCurrContent.result.readingLifeQuestions}
        />
      ),
    },
  };

  return (
    <>
      <MobileHeader title={`${thisYear}년 독서모임 연말결산`} backBtn />

      <main>
        <div className="relative mb-14 mt-2 rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-8 font-RomanticGumi leading-5 tracking-tighter">
            <span className="text-3xl tracking-tighter text-purple1">
              {thisYear}
            </span>
            년에는 독서모임에서
            <br />
            <span className="text-3xl tracking-tighter text-pointCoral">
              {clubBookListByYear.length}
            </span>
            권의 책을 진행했어요.
          </h2>

          <SwiperContainer options={swiperOptions}>
            {clubBookListByYear.map(book => (
              <SwiperSlide key={book.title}>
                <BookThumbnail
                  title={book.title}
                  thumbnail={book.thumbnail}
                  className="w-[72px]"
                />
              </SwiperSlide>
            ))}
          </SwiperContainer>

          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/books.png`}
            alt="책 3D 이미지"
            className="absolute right-0 top-0 w-[35%] opacity-50"
          />
        </div>

        <ul className="mb-5 flex flex-wrap gap-2">
          {Object.entries(contentObj).map(content => (
            <li key={content[0]}>
              <SquareBtn
                name={content[1].name}
                handleClick={() => setCurrTab(content[0])}
                className={`rounded-t-xl !px-3 !py-2 tracking-tighter ${currTab.includes(content[0]) ? 'bg-blue1 font-medium text-blue4' : '!bg-blue4 !text-blue2'}`}
              />
            </li>
          ))}
        </ul>

        <Section className="min-h-72">{contentObj[currTab]?.result}</Section>
      </main>
    </>
  );
}
