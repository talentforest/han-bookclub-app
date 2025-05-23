import { useEffect } from 'react';

import { getCollection } from 'api/firebase/getFbDoc';

import { meetingReviewsState } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';

import { REVIEW } from 'appConstants';
import { getFbRouteOfPost, thisYearMonthId } from 'utils';

import EmptyCard from 'components/common/container/EmptyCard';
import Post from 'components/post/Post';
import PostFooter from 'components/post/PostFooter';

interface Props {
  yearMonthId?: string;
}

const MeetingReviewList = ({ yearMonthId = thisYearMonthId }: Props) => {
  const [meetingReviews, setMeetingReviews] =
    useRecoilState(meetingReviewsState);

  const collName = getFbRouteOfPost(yearMonthId, REVIEW);

  useEffect(() => {
    getCollection(collName, setMeetingReviews);
  }, [collName]);

  return meetingReviews?.length !== 0 ? (
    <ul className="gap-4">
      {meetingReviews?.map(meetingReview => (
        <li
          className="mb-4 flex w-full break-inside-avoid flex-col gap-4"
          key={meetingReview.id}
        >
          <Post
            type="모임 후기"
            post={meetingReview}
            collName={collName}
            className="rounded-2xl bg-white p-4 shadow-card"
          >
            <PostFooter
              createdAt={meetingReview.createdAt}
              footerType="likes"
              post={meetingReview}
              collName={collName}
            />
          </Post>
        </li>
      ))}
    </ul>
  ) : (
    <EmptyCard text="작성된 모임 후기가 없습니다." />
  );
};

export default MeetingReviewList;
