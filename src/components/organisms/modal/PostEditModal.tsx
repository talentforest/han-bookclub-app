import { IDocument } from 'data/documentsAtom';
import { PostType } from '../PostEditDeleteBox';
import { FormEvent } from 'react';
import Modal from 'components/atoms/Modal';
import QuillEditor from 'components/atoms/QuillEditor';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import SquareBtn from 'components/atoms/button/SquareBtn';

interface Props {
  postType: PostType;
  post: IDocument;
  collName: string;
  onToggleClick: () => void;
}

export default function PostEditModal({
  postType,
  post,
  collName,
  onToggleClick,
}: Props) {
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
          placeholder={`수정할 텍스트를 작성해주세요.`}
          text={editedText}
          setText={setEditedText}
        />
        <SquareBtn name='수정하기' type='submit' />
      </form>
    </Modal>
  );
}
