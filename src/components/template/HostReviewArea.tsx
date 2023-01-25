import HostReviewBox from 'components/organisms/HostReviewBox';
import HostReviewCreateModal from 'components/organisms/bookclubthismonth/HostReviewCreateModal';
import { hostReviewState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getFbRoute, thisYearMonthIso } from 'util/index';
import { EmptyBox } from './RecommendArea';
import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';

interface IHostReviewAreaProps {
  id: string;
}

const HostReviewArea = ({ id }: IHostReviewAreaProps) => {
  const { pathname } = useLocation();
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);

  useEffect(() => {
    getCollection(getFbRoute(id).HOST_REVIEW, setHostReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              '발제자의 모임 정리 기록이 없습니다.'
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
