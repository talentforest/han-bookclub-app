import PostDeleteBtn from '@/components/common/button/PostDeleteBtn';
import PostEditBtn from '@/components/common/button/PostEditBtn';
import { IDocument } from '@/data/documentsAtom';

export type PostType =
  | '챌린지'
  | '발제문'
  | '정리 기록'
  | '불참 후기'
  | '모임 후기'
  | '추천책'
  | '공유하고 싶은 문구';

interface Props {
  collName: string;
  post: IDocument;
  postType: PostType;
}

const PostHandleBtns = ({ collName, post, postType }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <PostEditBtn collName={collName} post={post} postType={postType} />
      <PostDeleteBtn docId={post.id} collName={collName} />
    </div>
  );
};

export default PostHandleBtns;
