import { useState } from 'react';

import PostEditModal from '@/components/post/PostEditModal';
import { PostType } from '@/components/post/PostHandleBtns';
import { IDocument } from '@/data/documentsAtom';
import { FiEdit } from 'react-icons/fi';

interface Props {
  collName: string;
  postType: PostType;
  post: IDocument;
}

export default function PostEditBtn({ collName, postType, post }: Props) {
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
