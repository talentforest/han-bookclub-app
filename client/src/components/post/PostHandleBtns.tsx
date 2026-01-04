import { Collection, PostTypeValue, SubCollection, UserPost } from '@/types';

import PostDeleteBtn from '@/components/common/button/PostDeleteBtn';
import PostEditBtn from '@/components/common/button/PostEditBtn';

interface PostHandleBtnsProps {
  collName: Collection | SubCollection;
  post: UserPost;
  postType: PostTypeValue;
  className?: string;
}

const PostHandleBtns = ({
  collName,
  post,
  postType,
  className,
}: PostHandleBtnsProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <PostEditBtn collName={collName} post={post} postType={postType} />
      <PostDeleteBtn docId={post.docId} collName={collName} />
    </div>
  );
};

export default PostHandleBtns;
