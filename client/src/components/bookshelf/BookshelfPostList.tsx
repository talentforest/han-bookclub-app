import { IUserPostDocId, IUserPosts } from 'data/userAtom';

import PostBookThumbnailBox from 'components/post/PostBookThumbnailBox';
import { PostType } from 'components/post/PostHandleBtns';

interface Props {
  userRecords: IUserPosts;
  postType: PostType;
}

export default function BookshelfPostList({ userRecords, postType }: Props) {
  const userSubjects = userRecords?.subjects || [];
  const userHostReviews = userRecords?.hostReviews || [];
  const userReviews = userRecords?.reviews || [];

  const postList: Partial<{ [key in PostType]: IUserPostDocId[] }> = {
    발제문: userSubjects,
    '모임 후기': userReviews,
    '정리 기록': userHostReviews,
  };

  return (
    <ul className="grid grid-cols-7 gap-8 max-md:grid-cols-6 max-sm:grid-cols-4 max-sm:gap-4">
      {postList[postType].length !== 0 ? (
        postList[postType].map(postId => (
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
