import HostReviewBox from 'components/organisms/HostReviewBox';
import HostReviewCreateModal from 'components/organisms/bookclubthismonth/HostReviewCreateModal';
import { hostReviewState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { thisYearMonthIso } from 'util/index';
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
            yearMonthId={thisYearMonthIso}
          />
        ))
      ) : (
        <>
          {pathname.includes('bookclub') && <HostReviewCreateModal />}
          <EmptyBox>
            {pathname.includes('history') ? (
              '발제자의 기록이 없습니다.'
            ) : (
              <>
                아직 모임후 정리된
                <br />
                발제자의 기록이 없습니다.
              </>
            )}
          </EmptyBox>
        </>
      )}
    </>
  );
};

export default HostReviewArea;
