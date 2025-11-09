import { ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

type AppSwiperOptions = SwiperOptions & {
  breakpoints?: {
    [key in '1024' | '800' | '320']: { slidesPerView: number };
  };
};

interface SwiperContainerProps {
  children: ReactNode;
  options?: AppSwiperOptions;
}

export default function SwiperContainer({
  children,
  options,
}: SwiperContainerProps) {
  const initialSwiperOptions: AppSwiperOptions = {
    modules: [Autoplay, Pagination, Navigation, Scrollbar],
    spaceBetween: 15,
    slidesPerView: 'auto' as const,
    speed: 800,
    autoplay: {
      disableOnInteraction: true,
    },
    navigation: true,
    pagination: {
      type: 'bullets',
    },
    scrollbar: { draggable: true },
    ...options,
  };

  return (
    <Swiper className="sample-slider h-full" {...initialSwiperOptions}>
      {children}
    </Swiper>
  );
}
