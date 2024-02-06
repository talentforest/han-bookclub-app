import { useRecoilValue } from 'recoil';
import { allUsersState } from 'data/userAtom';
import { compareYearMonth } from 'util/index';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import RecommendedBookBoxById from './RecommendedBookBoxById';
import styled from 'styled-components';

export default function RecommendedBooksByIdScrollBox() {
  const usersData = useRecoilValue(allUsersState);

  const recommendedBookIds = usersData
    .map((item) => item?.userRecords?.recommendedBooks)
    .filter((item) => !!item?.length)
    .flat()
    .sort(compareYearMonth);

  return (
    <ScrollContainer>
      <Swiper
        modules={[Autoplay, Navigation, Scrollbar]}
        spaceBetween={15}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
          800: {
            slidesPerView: 4,
          },
          500: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 2,
          },
        }}
        slidesPerView='auto'
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation
        scrollbar={{ draggable: true }}
      >
        {recommendedBookIds.map((docIds) => (
          <SwiperSlide key={docIds.docId}>
            <RecommendedBookBoxById docIds={docIds} />
          </SwiperSlide>
        ))}
      </Swiper>
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  .swiper {
    padding-bottom: 25px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* 네비게이션 아이콘 스타일 */
  .swiper-button-prev {
    left: -5px;
  }
  .swiper-button-next {
    right: -5px;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 24px;
    color: ${({ theme }) => theme.container.blue3};
  }
  /* 스크롤바 드래그 현재 위치 색 */
  .swiper-scrollbar-drag {
    background-color: ${({ theme }) => theme.container.blue3};
  }
`;
