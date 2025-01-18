import { useState } from 'react';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { IDocument } from 'data/documentsAtom';

import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';

interface PropsType {
  post: IDocument;
  collName: string;
}

const useEditDoc = ({ post, collName }: PropsType) => {
  const [editedText, setEditedText] = useState(post.text);

  const docRef = doc(dbService, collName, post.id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('see');

  const updatedData = () => {
    if (collName.includes('Reviews')) {
      return { text: editedText };
    }
    return { text: editedText };
  };

  const onEditedSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    onToggleClick: () => void,
  ) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (editedText === '<p><br></p>') return alert('한글자 이상 작성해주세요.');

    await updateDoc(docRef, updatedData());

    onToggleClick();
  };

  const onEditedChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEditedText(event.currentTarget.value);
  };

  return {
    editedText,
    setEditedText,
    onEditedSubmit,
    onEditedChange,
  };
};

export default useEditDoc;
