import { useState } from 'react';

import { FiEdit } from 'react-icons/fi';

import { PostTypeName, UserPost } from '@/types';

import PostEditModal from '@/components/post/PostEditModal';

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
