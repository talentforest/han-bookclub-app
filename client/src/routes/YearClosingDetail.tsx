import { ReactNode, useMemo, useState } from 'react';

import { FaBook, FaBookReader, FaStar } from 'react-icons/fa';
import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { useGetClubByYear, useHandleChallenge } from '@/hooks';

import { nextYear, thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceRankList from '@/components/absence/AbsenceRankList';
import BookFieldHostTable from '@/components/bookClub/BookFieldHostTable';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import BestBookList from '@/components/event/BestBookList';
import BestSubjectList from '@/components/event/BestSubjectList';
import Confetti from '@/components/event/Confetti';
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
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
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
  }, [currTab, meeting]);

  const questionList = useMemo(() => {
    const contentList = meeting.eventMonth.contents.filter(
      content => content.result,
    );
    return contentList.find(content => content.title.includes('독서생활을'));
  }, [meeting]);

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
        <div>
          <Confetti
            title="우수 멤버"
            marqueeText="우수 멤버로 선정된 것을 축하합니다!"
            userIdList={
              userRankList
                .filter(({ rank }) => rank === 1)
                .map(user => user.creatorId) || []
            }
          />
          <ul className="mt-3 grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:flex max-sm:flex-col">
            {userRankList.map(userRank => (
              <ChallengeUserRankCard
                key={userRank.creatorId}
                userRank={userRank}
                color="dark"
              />
            ))}
          </ul>
        </div>
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
  };

  return (
    <>
      <MobileHeader
        title={`${thisYear}년 독서모임 연말결산`}
        backBtn
        className="!bg-black !text-white"
      />

      <main className="overflow-hidden bg-black pb-40 pt-4">
        <div className="relative mb-3 rounded-2xl bg-[#2a2a2a] px-4 py-6 shadow-card">
          <h2 className="font-RomanticGumi leading-5 text-white">
            <span className="mr-0.5 text-3xl tracking-[-0.1em] text-purple2">
              {thisYear}
            </span>
            년에는 독서모임에서
            <br />
            <span className="text-3xl tracking-[-0.1em] text-pointCoral">
              {clubBookListByYear.length}
            </span>
            권의 책을 진행했어요.
          </h2>

          <ul className="mt-6 flex flex-col gap-y-1">
            {[
              {
                title: '올해 진행한 책',
                anwser: `${clubBookListByYear.length}권`,
                icon: <FaBook className="mb-0.5 min-w-fit text-blue4" />,
              },
              {
                title: '올해 추천된 책',
                anwser: `12권`,
                icon: <FaStar className="mb-0.5 min-w-fit text-blue4" />,
              },
              {
                title: '올해 챌린저',
                anwser: `${userRankList.filter(user => user.totalRereadingCounts).length}명`,
                icon: <FaBookReader className="mb-0.5 min-w-fit text-white" />,
              },
            ].map(({ anwser, title, icon }) => (
              <li key={title} className="flex items-center">
                {icon}
                <h4 className="ml-1 mr-2 min-w-40 font-RomanticGumi text-[15px] font-medium tracking-tighter text-white">
                  {title}
                  <div className="border border-dotted" />
                </h4>
                <span className="font-RomanticGumi text-[15px] font-semibold tracking-tighter text-white">
                  {anwser}
                </span>
              </li>
            ))}
          </ul>

          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/books.png`}
            alt="책 3D 이미지"
            className="absolute right-0 top-2 w-[35%]"
          />
        </div>

        <div className="max-sm:-mx-5">
          <SwiperContainer options={swiperOptions}>
            {clubBookListByYear.map(book => (
              <SwiperSlide key={book.title}>
                <BookThumbnail
                  title={book.title}
                  thumbnail={book.thumbnail}
                  className="w-[82px] shadow-md shadow-white"
                />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>

        {/* 여러 탭 */}
        <ul className="mb-5 mt-24 flex flex-wrap gap-1.5">
          {Object.entries(contentObj).map(content => (
            <li key={content[0]}>
              <SquareBtn
                name={content[1].name}
                handleClick={() => setCurrTab(content[0])}
                className={`rounded-t-xl !px-3 !text-sm tracking-tighter ${currTab.includes(content[0]) ? '!bg-darkGray font-bold !text-white' : '!bg-gray2 !text-darkGray'}`}
              />
            </li>
          ))}
        </ul>

        <Section className="min-h-72">{contentObj[currTab]?.result}</Section>

        <Section
          title="독서생활을 돌아보는 질문"
          className={'!mt-4 [&>h3]:text-white'}
        >
          <ReadingLifeQuestionList
            questionList={questionList.result.readingLifeQuestions}
          />
        </Section>

        <Section
          title={`${nextYear}년 독서분야와 발제자`}
          className={'!mt-4 [&>h3]:text-white'}
        >
          <BookFieldHostTable year={nextYear} isMonth isEditable color="dark" />
        </Section>
      </main>
    </>
  );
}
