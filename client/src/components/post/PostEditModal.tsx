import { FormEvent } from 'react';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import QuillEditor from '@/components/common/editor/QuillEditor';
import useEditDoc from '@/hooks/handleFbDoc/useEditDoc';
import { PostTypeName, UserPost } from '@/types';

interface PostEditModalProps {
  postType: PostTypeName;
  post: UserPost;
  collName: string;
  onToggleClick: () => void;
}

export default function PostEditModal({
  postType,
  post,
  collName,
  onToggleClick,
}: PostEditModalProps) {
  const { onEditedSubmit, editedText, setEditedText } = useEditDoc({
    post,
    collName,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    onEditedSubmit(event, onToggleClick);

  return (
    <Modal title={`${postType} 수정`} onToggleClick={onToggleClick}>
      <form onSubmit={handleSubmit}>
        <QuillEditor
          placeholder="수정할 텍스트를 작성해주세요."
          text={editedText}
          setText={setEditedText}
        />
        <SquareBtn name="수정하기" type="submit" className="ml-auto" />
      </form>
    </Modal>
  );
}
