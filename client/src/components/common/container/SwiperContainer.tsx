import { ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';

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
    <Swiper className="h-full" {...swiperOptions}>
      {children}
    </Swiper>
  );
}
