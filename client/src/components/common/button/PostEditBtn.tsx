import { useState } from 'react';

import PostEditModal from '@/components/post/PostEditModal';
import { PostTypeName, UserPost } from '@/types';
import { FiEdit } from 'react-icons/fi';

interface PostEditBtnProps {
  collName: string;
  postType: PostTypeName;
  post: UserPost;
}

export default function PostEditBtn({
  collName,
  postType,
  post,
}: PostEditBtnProps) {
  const [isEditing, setIsEditing] = useState(false);

  const onToggleClick = () => setIsEditing(prev => !prev);

  return (
    <>
      <button onClick={onToggleClick}>
        <FiEdit fontSize={14} stroke="#aaa" />
      </button>

      {isEditing && (
        <PostEditModal
          postType={postType}
          post={post}
          collName={collName}
          onToggleClick={onToggleClick}
        />
      )}
    </>
  );
}
