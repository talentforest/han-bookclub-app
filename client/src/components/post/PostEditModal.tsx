import { useEditDoc } from '@/hooks';

import { PostTypeName, UserPost } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import QuillEditor from '@/components/common/editor/QuillEditor';

interface PostEditModalProps {
  postType: PostTypeName;
  post: UserPost;
  collName: string;
}

export default function PostEditModal({
  postType,
  post,
  collName,
}: PostEditModalProps) {
  const { onEditedSubmit, editedText, setEditedText } = useEditDoc({
    post,
    collName,
  });

  return (
    <Modal title={`${postType} 수정`}>
      <form onSubmit={onEditedSubmit}>
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
