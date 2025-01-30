import { IUserPostDocs } from 'data/userAtom';

import PostBookThumbnailBox from 'components/post/PostBookThumbnailBox';
import { PostType } from 'components/post/PostHandleBtns';

interface Props {
  userRecords: IUserPostDocs;
  postType: PostType;
}

export default function BookshelfPostList({ userRecords, postType }: Props) {
  const userSubjects = userRecords?.subjects || [];
  const userHostReviews = userRecords?.hostReviews || [];
  const userReviews = userRecords?.reviews || [];

  const postIds =
    postType === '발제문'
      ? userSubjects
      : postType === '모임 후기'
        ? userReviews
        : postType === '정리 기록'
          ? userHostReviews
          : [];

  return (
    <ul className="grid grid-cols-7 gap-4 max-md:grid-cols-5 max-sm:grid-cols-4">
      {postIds.length !== 0 ? (
        postIds.map(postId => (
          <PostBookThumbnailBox
            key={postId.docId}
            postId={postId}
            postType={postType}
          />
        ))
      ) : (
        <span>아직 작성한 {postType}가 없어요.</span>
      )}
    </ul>
  );
}
