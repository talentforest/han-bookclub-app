import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { allUsersAtom } from '@/data/userAtom';

import { useGetClubByYear } from '@/hooks';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import UserImgName from '@/components/common/user/UserImgName';

export default function YearClosingDetail() {
  const usersDoc = useRecoilValue(allUsersAtom);

  const absenceList = useRecoilValue(absenceAtom);

  const { clubBookListByYear } = useGetClubByYear();

  const absenceMemberObj = new Set(
    absenceList?.absenceMembers
      ?.map(({ breakMembers, onceAbsenceMembers }) => [
        ...breakMembers,
        ...onceAbsenceMembers,
      ])
      .flat(),
  );

  const pefectAttendanceMemberList = usersDoc.filter(
    ({ id }) => !absenceMemberObj.has(id),
  );

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
                    className="w-[65px]"
                  />
                </SwiperSlide>
              ))}
            </SwiperContainer>

            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/books.png`}
              alt="책 3D 이미지"
              className="absolute right-4 top-4 w-1/4 opacity-50"
            />
          </div>
        </div>

        <Section title="🎖️2025년 우수 멤버 선정">
          <div className="flex gap-4">
            <div className="w-full rounded-xl bg-white p-4 shadow-card">
              <h2 className="mb-2 text-[15px] font-medium text-blue3">
                개근 우수 멤버
              </h2>
              {pefectAttendanceMemberList.map(({ id }) => (
                <UserImgName key={id} userId={id} />
              ))}
            </div>

            {/* <div className="w-full rounded-xl bg-white p-4 shadow-card">
              <h2 className="mb-2 text-[15px] font-medium text-blue3">
                챌린지 우수 멤버
              </h2>
            </div> */}
          </div>
        </Section>

        <Section title="2025년 가장 좋았던 책과 발제문">
          <ul className="rounded-xl bg-white p-4 shadow-card">
            <span>hi</span>
          </ul>
        </Section>
      </main>
    </>
  );
}
