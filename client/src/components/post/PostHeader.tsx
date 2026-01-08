import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { Collection, PostTypeValue, SubCollection, UserPost } from '@/types';

import CreatorBox from '@/components/common/user/CreatorBox';
import PostHandleBtns from '@/components/post/PostHandleBtns';

interface PostHeaderProps {
  collName: Collection | SubCollection;
  post: UserPost;
  postType?: PostTypeValue;
}

export default function PostHeader({
  collName,
  post,
  postType,
}: PostHeaderProps) {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { creatorId, isAnonymous } = post;

  return (
    <header className="flex items-center justify-between gap-1 rounded-xl">
      <CreatorBox creatorId={creatorId} isAnonymous={isAnonymous} />

      {uid === creatorId && collName && (
        <PostHandleBtns post={post} collName={collName} postType={postType} />
      )}
    </header>
  );
}
