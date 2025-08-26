import PostDeleteBtn from '@/components/common/button/PostDeleteBtn';
import PostEditBtn from '@/components/common/button/PostEditBtn';
import { PostTypeName, UserPost } from '@/types';

interface PostHandleBtnsProps {
  collName: string;
  post: UserPost;
  postType: PostTypeName;
}

const PostHandleBtns = ({ collName, post, postType }: PostHandleBtnsProps) => {
  return (
    <div className="flex items-center gap-3">
      <PostEditBtn collName={collName} post={post} postType={postType} />
      <PostDeleteBtn docId={post.id} collName={collName} />
    </div>
  );
};

export default PostHandleBtns;
