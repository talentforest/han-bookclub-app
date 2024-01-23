import { IDocument } from 'data/documentsAtom';
import { FormEvent } from 'react';
import Modal from 'components/atoms/Modal';
import QuillEditor from 'components/atoms/QuillEditor';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import SquareBtn from 'components/atoms/button/SquareBtn';

interface Props {
  post: IDocument;
  collName: string;
  onToggleClick: () => void;
}

export default function PostEditModal({
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
    <Modal title='발제문 수정하기' onToggleClick={onToggleClick}>
      <form onSubmit={handleSubmit}>
        <QuillEditor
          placeholder='발제자의 정리 기록을 수정해주세요.'
          text={editedText}
          setText={setEditedText}
        />
        <SquareBtn name='수정하기' type='submit' />
      </form>
    </Modal>
  );
}
