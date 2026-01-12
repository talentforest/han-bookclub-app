import { useRecoilValue } from 'recoil';

import { meetingReviewListAtomFamily } from '@/data/documentsAtom';

import { REVIEWS } from '@/appConstants';

import { getFbRouteOfPost, thisYearMonthId } from '@/utils';

import EmptyCard from '@/components/common/container/EmptyCard';
import MeetingReviewForm from '@/components/post/MeetingReviewForm';
import Post from '@/components/post/Post';
import PostFooter from '@/components/post/PostFooter';

interface MeetingReviewListProps {
  yearMonthId?: string;
}

const MeetingReviewList = ({
  yearMonthId = thisYearMonthId,
}: MeetingReviewListProps) => {
  const collName = getFbRouteOfPost(yearMonthId, REVIEWS);

  const { status, data: meetingReviewList } = useRecoilValue(
    meetingReviewListAtomFamily(collName),
  );

  const isThisMonthDetail = yearMonthId === thisYearMonthId;

  return (
    status === 'loaded' && (
      <div
        className={`${!isThisMonthDetail && meetingReviewList.length === 0 ? 'columns-1' : 'columns-2'} max-sm:columns-1`}
      >
        {isThisMonthDetail && <MeetingReviewForm yearMonthId={yearMonthId} />}

        {meetingReviewList?.length !== 0 ? (
          <ul>
            {meetingReviewList?.map(meetingReview => (
              <li
                className="mb-6 flex w-full break-inside-avoid flex-col gap-4"
                key={meetingReview.docId}
              >
                <Post
                  type="모임 후기"
                  post={meetingReview}
                  collName={collName}
                  className="rounded-2xl bg-white p-4 shadow-card"
                >
                  <PostFooter
                    createdAt={meetingReview.createdAt}
                    footerType="like"
                    post={meetingReview}
                    collName={collName}
                  />
                </Post>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCard text="작성된 모임 후기가 없습니다." />
        )}
      </div>
    )
  );
};

export default MeetingReviewList;
