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
import Confetti from '@/components/common/container/Confetti';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
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
          <ul className="mt-3 flex flex-col gap-y-2">
            {userRankList.map(userRank => (
              <ChallengeUserRankCard
                key={userRank.creatorId}
                userRank={userRank}
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
      <MobileHeader
        title={`${thisYear}년 독서모임 연말결산`}
        backBtn
        className="!bg-black !text-white"
      />

      <main className="bg-black pb-40 pt-4">
        <div className="relative mb-3 rounded-2xl bg-white px-4 py-6 shadow-card">
          <h2 className="font-RomanticGumi leading-5">
            <span className="mr-0.5 text-3xl tracking-[-0.1em] text-purple1">
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
                icon: <FaBook className="mb-0.5 min-w-fit text-blue2" />,
              },
              {
                title: '올해 추천된 책',
                anwser: `12권`,
                icon: <FaStar className="mb-0.5 min-w-fit text-blue2" />,
              },
              {
                title: '올해 챌린저',
                anwser: `${userRankList.filter(user => user.totalRereadingCounts).length}명`,
                icon: <FaBookReader className="mb-0.5 min-w-fit text-blue2" />,
              },
            ].map(({ anwser, title, icon }) => (
              <li key={title} className="flex items-center">
                {icon}
                <h4 className="ml-1 mr-2 min-w-40 font-RomanticGumi text-[15px] font-medium tracking-tighter text-blue2">
                  {title}
                  <div className="border border-dotted" />
                </h4>
                <span className="font-RomanticGumi text-[15px] font-semibold tracking-tighter text-blue1">
                  {anwser}
                </span>
              </li>
            ))}
          </ul>

          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/books.png`}
            alt="책 3D 이미지"
            className="absolute right-0 top-2 w-[35%] opacity-50"
          />
        </div>

        <div className="max-sm:-mx-5">
          <SwiperContainer options={swiperOptions}>
            {clubBookListByYear.map(book => (
              <SwiperSlide key={book.title}>
                <BookThumbnail
                  title={book.title}
                  thumbnail={book.thumbnail}
                  className="w-[78px] shadow-md shadow-white"
                />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>

        <ul className="mb-5 mt-24 flex flex-wrap gap-1.5">
          {Object.entries(contentObj).map(content => (
            <li key={content[0]}>
              <SquareBtn
                name={content[1].name}
                handleClick={() => setCurrTab(content[0])}
                className={`rounded-t-xl !px-3 !text-sm tracking-tighter ${currTab.includes(content[0]) ? 'bg-blue1 font-medium text-blue4' : '!bg-blue4 !text-blue2'}`}
              />
            </li>
          ))}
        </ul>

        <Section className="min-h-72 overflow-hidden">
          {contentObj[currTab]?.result}
        </Section>

        <Section
          className={'!mt-24 [&>h3]:text-white'}
          title={`${nextYear}년의 독서분야와 발제자 정하기`}
        >
          <BookFieldHostTable
            year={nextYear}
            color="lightBlue"
            isEditable
            isMonth
          />
        </Section>
      </main>
    </>
  );
}
