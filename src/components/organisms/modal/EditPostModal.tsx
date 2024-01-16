import { IDocument } from 'data/documentsAtom';
import Modal from 'components/atoms/Modal';
import QuillEditor from 'components/atoms/QuillEditor';
import useEditDoc from 'hooks/handleFbDoc/useEditDoc';
import styled from 'styled-components';
import { FormEvent } from 'react';

interface Props {
  post: IDocument;
  collName: string;
  onToggleClick: () => void;
}

export default function EditPostModal({
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
        <SubmitBtn type='submit' value='설정하기' />
      </form>
    </Modal>
  );
}

const SubmitBtn = styled.input`
  border: 1px solid #eaeaea;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px 10px 10px;
  font-size: 16px;
  background-color: ${(props) => props.theme.container.blue};
  color: #fff;
`;
