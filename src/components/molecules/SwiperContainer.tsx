import { ReactNode } from 'react';
import { Navigation, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  options?: {
    spaceBetween?: number;
    breakpoints?: { [key: number]: { slidesPerView: number } };
    slidesPerView?: number | 'auto';
  };
}

export default function SwiperContainer({ children, options }: Props) {
  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation, Scrollbar],
    spaceBetween: 15,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    navigation: true,
    pagination: {
      type: 'fraction' as 'fraction' | 'bullets' | 'progressbar' | 'custom',
    },
    scrollbar: { draggable: true },
    ...options,
  };

  return (
    <Container>
      <Swiper {...swiperOptions}>{children}</Swiper>
    </Container>
  );
}

const Container = styled.div`
  .swiper {
    padding-bottom: 20px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
  }
  /* 네비게이션 아이콘 스타일 */
  .swiper-button-prev {
    left: 2px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.text.gray1};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 30px;
    height: 30px;
    top: 42%;
  }
  .swiper-button-next {
    right: 2px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.text.gray1};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 30px;
    height: 30px;
    top: 42%;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 14px;
    color: ${({ theme }) => theme.text.default};
  }
  /* 스크롤바 드래그 */
  .swiper-scrollbar.swiper-scrollbar-horizontal {
    cursor: pointer;
  }
  .swiper-scrollbar-drag {
    background-color: ${({ theme }) => theme.text.gray2};
  }
  .swiper-pagination {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text.gray2};
  }
`;
