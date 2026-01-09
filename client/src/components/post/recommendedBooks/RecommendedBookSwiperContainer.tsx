import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { recommendedBookListAtomFamily } from '@/data/documentsAtom';

import { LoadableStatus, UserPost } from '@/types';

import EmptyCard from '@/components/common/container/EmptyCard';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import PostRecommendedBookCard from '@/components/post/recommendedBooks/PostRecommendedBookCard';

interface RecommendedBookSwiperContainerProps {
  yearMonthId?: string;
}

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 2,
    },
    500: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
    },
  },
  scrollbar: false,
};

export default function RecommendedBookSwiperContainer({
  yearMonthId,
}: RecommendedBookSwiperContainerProps) {
  const { data: bookList, status } = useRecoilValue<LoadableStatus<UserPost[]>>(
    recommendedBookListAtomFamily(yearMonthId),
  );

  return (
    status === 'loaded' &&
    (bookList?.length !== 0 ? (
      <SwiperContainer options={swiperOptions}>
        {bookList.map(book => (
          <SwiperSlide key={book.docId}>
            <PostRecommendedBookCard
              post={book}
              collName={`BookClub-${(yearMonthId || book?.yearMonthId).slice(0, 4)}/${yearMonthId || book?.yearMonthId}/RecommendedBooks`}
            />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    ) : (
      <EmptyCard text="추천된 책이 없습니다." />
    ))
  );
}
