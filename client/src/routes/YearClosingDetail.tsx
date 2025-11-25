import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { useGetClubByYear, useHandleChallenge } from '@/hooks';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceRankList from '@/components/absence/AbsenceRankList';
import ChallengeUserRankCard from '@/components/challenge/ChallengeUserRankCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';

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
  const { clubBookListByYear } = useGetClubByYear();

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const { userRankList } = useHandleChallenge();

  return (
    <>
      <MobileHeader title={`${thisYear}년 독서모임 연말결산`} backBtn />

      <main>
        <div className="relative mb-14 mt-2 rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-4 font-GiantsInline italic leading-5">
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

        {monthlyBookClub?.meeting?.eventMonth &&
          monthlyBookClub?.meeting?.eventMonth.contents.map(content => (
            <Section key={content.id} title={content.title}>
              {content.title.includes('챌린지') && (
                <ul className="flex flex-col gap-y-3">
                  {userRankList.map(userRank => (
                    <ChallengeUserRankCard
                      key={userRank.creatorId}
                      userRank={userRank}
                    />
                  ))}
                </ul>
              )}
              {content.title.includes('개근상') && <AbsenceRankList />}
            </Section>
          ))}
      </main>
    </>
  );
}
