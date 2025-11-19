import { FiEdit } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

import { PostTypeName, SubCollection, UserPost } from '@/types';

import PostEditModal from '@/components/post/PostEditModal';

interface PostEditBtnProps {
  collName: SubCollection;
  postType: PostTypeName;
  post: UserPost;
}

export default function PostEditBtn({
  collName,
  postType,
  post,
}: PostEditBtnProps) {
  const { showModal } = useHandleModal();

  const onClick = () =>
    showModal({
      element: (
        <PostEditModal postType={postType} post={post} collName={collName} />
      ),
    });

  return (
    <button onClick={onClick}>
      <FiEdit fontSize={14} stroke="#aaa" />
    </button>
  );
}
