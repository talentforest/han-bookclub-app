import { useMemo } from 'react';

import { SwiperSlide } from 'swiper/react';

import { useRecoilValue } from 'recoil';

import { allUsersAtom } from '@/data/userAtom';

import { compareYearMonth } from '@/utils';

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
  const usersData = useRecoilValue(allUsersAtom);

  const recommendedBookIds = useMemo(() => {
    const allRecommendedBookIds = usersData
      .map(item => item?.userRecords?.recommendedBooks)
      .filter(item => !!item?.length)
      .flat()
      .sort(compareYearMonth)
      .slice(0, 3);

    const thisMonthRecommendedBookIds = allRecommendedBookIds
      .filter(recommendedBookId => {
        return yearMonthId
          ? recommendedBookId.monthId === yearMonthId
          : recommendedBookId;
      })
      .sort(compareYearMonth);

    return yearMonthId ? thisMonthRecommendedBookIds : allRecommendedBookIds;
  }, [usersData, yearMonthId]);

  return recommendedBookIds.length !== 0 ? (
    <SwiperContainer options={swiperOptions}>
      {recommendedBookIds.map(docIds => (
        <SwiperSlide key={docIds.docId}>
          <PostRecommendedBookCard docIds={docIds} />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  ) : (
    <EmptyCard text="추천된 책이 없습니다." />
  );
}
