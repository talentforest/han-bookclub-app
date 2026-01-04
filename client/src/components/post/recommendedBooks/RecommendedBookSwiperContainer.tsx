import { useEffect, useState } from 'react';

import { limit } from 'firebase/firestore';
import { SwiperSlide } from 'swiper/react';

import { getCollection, getSubCollectionGroup } from '@/api';

import { RECOMMENDED_BOOKS, isLoadingStatus } from '@/appConstants';

import { LoadableStatus, UserPost } from '@/types';

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
  const [{ data: bookList, status }, setBookList] =
    useState<LoadableStatus<UserPost[]>>(isLoadingStatus);

  const year = yearMonthId?.slice(0, 4);

  useEffect(() => {
    if (yearMonthId) {
      getCollection(
        `BookClub-${year}/${yearMonthId}/${RECOMMENDED_BOOKS}`,
        setBookList,
      );
    } else {
      getSubCollectionGroup(RECOMMENDED_BOOKS, setBookList, limit(limitNum));
    }
  }, [yearMonthId]);

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
