import { useRecoilValue } from 'recoil';

import EmptyCard from '@/components/common/container/EmptyCard';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import PostRecommendedBookCard from '@/components/post/recommendedBooks/PostRecommendedBookCard';
import { allUsersAtom } from '@/data/userAtom';
import { compareYearMonth } from '@/utils';
import { SwiperSlide } from 'swiper/react';

interface RecommendedBookSwiperContainerProps {
  yearMonthId?: string;
}

const swiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 6,
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
  },
  pagination: false,
};

export default function RecommendedBookSwiperContainer({
  yearMonthId,
}: RecommendedBookSwiperContainerProps) {
  const usersData = useRecoilValue(allUsersAtom);

  const allRecommendedBookIds = usersData
    .map(item => item?.userRecords?.recommendedBooks)
    .filter(item => !!item?.length)
    .flat()
    .sort(compareYearMonth);

  const thisMonthRecommendedBookIds = allRecommendedBookIds
    .filter(recommendedBookId => {
      return yearMonthId
        ? recommendedBookId.monthId === yearMonthId
        : recommendedBookId;
    })
    .sort(compareYearMonth);

  const recommendedBookIds = yearMonthId
    ? thisMonthRecommendedBookIds
    : allRecommendedBookIds;

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
