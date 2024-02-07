import { ReactNode } from 'react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
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
    modules: [Autoplay, Navigation, Scrollbar],
    spaceBetween: 15,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    navigation: true,
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
    left: -5px;
  }
  .swiper-button-next {
    right: -5px;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 24px;
    color: ${({ theme }) => theme.container.purple2};
  }
  /* 스크롤바 드래그 */
  .swiper-scrollbar.swiper-scrollbar-horizontal {
    cursor: pointer;
  }
  .swiper-scrollbar-drag {
    background-color: ${({ theme }) => theme.container.purple2};
  }
`;
