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

interface Props {
  children: ReactNode;
  options?: AppSwiperOptions;
}

export default function SwiperContainer({ children, options }: Props) {
  const initialSwiperOptions: AppSwiperOptions = {
    modules: [Autoplay, Pagination, Navigation, Scrollbar],
    spaceBetween: 15,
    slidesPerView: 'auto' as const,
    speed: 2000,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
    },
    loop: true,
    navigation: true,
    pagination: {
      type: 'bullets',
    },
    scrollbar: { draggable: true },
    ...options,
  };

  return (
    <Swiper className="h-full" {...initialSwiperOptions}>
      {children}
    </Swiper>
  );
}
