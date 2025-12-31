import { useEffect, useState } from 'react';

import { limit } from 'firebase/firestore';
import { SwiperSlide } from 'swiper/react';

import { getCollection, getSubCollectionGroup } from '@/api';

import { RECOMMENDED_BOOKS } from '@/appConstants';

import { UserPost } from '@/types';

import EmptyCard from '@/components/common/container/EmptyCard';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import PostRecommendedBookCard from '@/components/post/recommendedBooks/PostRecommendedBookCard';

interface RecommendedBookSwiperContainerProps {
  limitNum?: number;
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
  limitNum,
  yearMonthId,
}: RecommendedBookSwiperContainerProps) {
  const [bookList, setBookList] = useState<UserPost[]>([]);

  useEffect(() => {
    if (yearMonthId) {
      getCollection(
        `BookClub-${yearMonthId?.slice(0, 4)}/${yearMonthId}/${RECOMMENDED_BOOKS}`,
        setBookList,
      );
    } else {
      getSubCollectionGroup(RECOMMENDED_BOOKS, setBookList, limit(limitNum));
    }
  }, []);

  return bookList.length !== 0 ? (
    <SwiperContainer options={swiperOptions}>
      {bookList.map(book => (
        <SwiperSlide key={book.id}>
          <PostRecommendedBookCard
            post={book}
            collName={`BookClub-${(yearMonthId || book?.yearMonthId).slice(0, 4)}/${yearMonthId || book?.yearMonthId}/RecommendedBooks`}
          />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  ) : (
    <EmptyCard text="추천된 책이 없습니다." />
  );
}
