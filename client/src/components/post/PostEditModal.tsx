import { useEditDoc } from '@/hooks';

import { Collection, PostTypeName, SubCollection, UserPost } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import QuillEditor from '@/components/common/editor/QuillEditor';

interface PostEditModalProps {
  postType: PostTypeName;
  post: UserPost;
  collName: Collection | SubCollection;
}

export default function PostEditModal({
  postType,
  post,
  collName,
}: PostEditModalProps) {
  const { onEditSubmit, setEditedData, editedData } = useEditDoc<
    Partial<UserPost>
  >({
    dataToUpdate: {
      text: post.text,
      updatedAt: post?.updatedAt || '',
    },
    collName,
    docId: post.id,
  });

  const onEditedTextChange = (text: string) => {
    setEditedData({ text });
  };

  return (
    <Modal title={`${postType} 수정`}>
      <form onSubmit={onEditSubmit}>
        <QuillEditor
          placeholder="수정할 텍스트를 작성해주세요."
          text={editedData.text}
          setText={onEditedTextChange}
        />
        <SquareBtn name="수정하기" type="submit" className="ml-auto" />
      </form>
    </Modal>
  );
}
