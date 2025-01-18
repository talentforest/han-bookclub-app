import { IDocument } from 'data/documentsAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import CreatorBox from '../common/user/CreatorBox';

import PostHandleBtns, { PostType } from 'components/post/PostHandleBtns';

interface Props {
  collName: string;
  post: IDocument;
  postType?: PostType;
}

export default function PostHeader({ collName, post, postType }: Props) {
  const userData = useRecoilValue(currentUserState);

  const { creatorId } = post;

  return (
    <header className="flex items-center justify-between gap-1 rounded-xl">
      <CreatorBox creatorId={creatorId} />

      {userData.uid === creatorId && collName && (
        <PostHandleBtns post={post} collName={collName} postType={postType} />
      )}
    </header>
  );
}
