import { useMemo } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { clubByMonthSelector } from '@/data/clubAtom';
import { allUsersAtom } from '@/data/userAtom';

import { useGetClubByYear } from '@/hooks';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import UserImgName from '@/components/common/user/UserImgName';

export default function YearClosingDetail() {
  const usersDoc = useRecoilValue(allUsersAtom);

  const absenceList = useRecoilValue(absenceAtom);

  const { clubBookListByYear } = useGetClubByYear();

  const monthlyBookClub = useRecoilValue(clubByMonthSelector('2025-12'));

  const absenceMemberObj = new Set(
    absenceList?.absenceMembers
      ?.map(({ breakMembers, onceAbsenceMembers }) => [
        ...breakMembers,
        ...onceAbsenceMembers,
      ])
      .flat(),
  );

  const allMemberAbsenceCount = useMemo(() => {
    if (absenceList?.absenceMembers === undefined) return [];

    return [
      ...usersDoc
        .filter(({ id }) => !absenceMemberObj.has(id))
        .map(({ id }) => {
          return { [id]: 0 };
        }),
      ...Object?.entries(
        absenceList?.absenceMembers
          ?.map(({ breakMembers, onceAbsenceMembers }) => [
            ...breakMembers,
            ...onceAbsenceMembers,
          ])
          .flat()
          .reduce(
            (acc, cur) => {
              acc[cur] = (acc[cur] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
      )
        .map(([key, value]) => ({ [key]: value }))
        .sort((a, b) => Object.values(a)[0] - Object.values(b)[0]),
    ];
  }, [absenceList, usersDoc]);

  const perfectAttendanceMemberList = allMemberAbsenceCount
    .filter(obj => Object.values(obj)[0] === 0)
    .map(obj => Object.keys(obj)[0]);

  const absenceMemberList = allMemberAbsenceCount
    .filter(obj => Object.values(obj)[0] > 0)
    .map(obj => Object.keys(obj)[0]);

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

  return (
    <>
      <MobileHeader title={`${thisYear}년 독서모임 연말결산`} backBtn />

      <main>
        <div className="relative mb-14 mt-2 rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-GiantsInline italic leading-5">
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

          <div className="-mx-5 mt-6">
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
              className="absolute right-0 top-0 w-2/5 opacity-50"
            />
          </div>
        </div>

        {monthlyBookClub?.meeting?.eventMonth &&
          monthlyBookClub?.meeting?.eventMonth.contents.map(content => (
            <Section key={content.id} title={content.title}>
              <div className="relative mx-auto mt-8">
                <img
                  src={`${import.meta.env.VITE_PUBLIC_URL}/stage.png`}
                  alt="시상대"
                  className="w-[280px]"
                />
                <div className="absolute -top-6 flex w-full items-start justify-center gap-x-9">
                  {/* 2등 */}
                  {perfectAttendanceMemberList.length === 1 && (
                    <UserImgName
                      key={absenceMemberList[0]}
                      userId={absenceMemberList[0]}
                      className="mt-11 text-lg font-medium [&>img]:size-5"
                    />
                  )}

                  {/* 1등 */}
                  <div className="flex">
                    {perfectAttendanceMemberList.map(memberId => (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl">🥇</span>
                        <UserImgName
                          key={memberId}
                          userId={memberId}
                          className="text-lg font-medium [&>img]:size-5"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 3등 */}
                  <div className="flex">
                    <UserImgName
                      key={absenceMemberList[1]}
                      userId={absenceMemberList[1]}
                      className="mt-12 text-lg font-medium [&>img]:size-5"
                    />
                  </div>
                </div>
              </div>
            </Section>
          ))}

        <Section title="2025년 가장 좋았던 책과 발제문">
          <ul className="rounded-xl bg-white p-4 shadow-card">
            <span>hi</span>
          </ul>
        </Section>
      </main>
    </>
  );
}
