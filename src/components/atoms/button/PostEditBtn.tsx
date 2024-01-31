import { PostType } from 'components/molecules/PostHandleBtns';
import PostEditModal from 'components/organisms/modal/PostEditModal';
import { IDocument } from 'data/documentsAtom';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

interface Props {
  collName: string;
  postType: PostType;
  post: IDocument;
}

export default function PostEditBtn({ collName, postType, post }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const onToggleClick = () => setIsEditing((prev) => !prev);

  return (
    <>
      <button onClick={onToggleClick}>
        <FiEdit fontSize={14} stroke='#888' />
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
