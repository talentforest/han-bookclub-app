import { useRecoilValue } from 'recoil';
import { allUsersState } from 'data/userAtom';
import { compareYearMonth } from 'util/index';
import { SwiperSlide } from 'swiper/react';
import SwiperContainer from 'components/molecules/SwiperContainer';
import RecommendedBookBoxById from './RecommendedBookBoxById';

const swiperOptions = {
  slidesPerView: 'auto' as 'auto',
  breakpoints: {
    1024: {
      slidesPerView: 5,
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
};

export default function RecommendedBooksByIdScrollBox() {
  const usersData = useRecoilValue(allUsersState);

  const recommendedBookIds = usersData
    .map((item) => item?.userRecords?.recommendedBooks)
    .filter((item) => !!item?.length)
    .flat()
    .sort(compareYearMonth);

  return (
    <SwiperContainer options={swiperOptions}>
      {recommendedBookIds.map((docIds) => (
        <SwiperSlide key={docIds.docId}>
          <RecommendedBookBoxById docIds={docIds} />
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
}
