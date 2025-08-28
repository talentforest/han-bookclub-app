import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useAlertAskJoin, useHandleModal } from '@/hooks';

import { UserPost } from '@/types';

interface UseEditDocProps {
  post: UserPost;
  collName: string;
}

export const useEditDoc = ({ post, collName }: UseEditDocProps) => {
  const [editedText, setEditedText] = useState(post.text);

  const docRef = doc(dbService, collName, post.id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('see');

  const updatedData = () => {
    if (collName.includes('Reviews')) {
      return { text: editedText };
    }
    return { text: editedText };
  };

  const { hideModal } = useHandleModal();

  const onEditedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (editedText === '<p><br></p>') return alert('한글자 이상 작성해주세요.');

    await updateDoc(docRef, updatedData());

    hideModal();
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
