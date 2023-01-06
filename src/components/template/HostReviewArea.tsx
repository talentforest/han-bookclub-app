import HostReviewBox from 'components/organisms/HostReviewBox';
import HostReviewCreateModal from 'components/organisms/bookclubthismonth/HostReviewCreateModal';
import { hostReviewState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { thisYearMonth } from 'util/index';
import { EmptyBox } from './RecommendArea';

const HostReviewArea = () => {
  const { pathname } = useLocation();
  const hostReview = useRecoilValue(hostReviewState);
  return (
    <>
      {hostReview?.length !== 0 ? (
        hostReview?.map((review) => (
          <HostReviewBox
            key={review.id}
            review={review}
            yearMonthId={thisYearMonth}
          />
        ))
      ) : (
        <>
          {pathname.includes('bookclub') && <HostReviewCreateModal />}
          <EmptyBox>아직 모임 후 정리된 기록이 없습니다.</EmptyBox>
        </>
      )}
    </>
  );
};

export default HostReviewArea;
