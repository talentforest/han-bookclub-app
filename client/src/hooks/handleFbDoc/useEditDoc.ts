import { useState } from 'react';

import { dbService } from '@/fbase';
import { AddPrefixToKeys, doc, updateDoc } from 'firebase/firestore';

import { useAlertAskJoin, useHandleModal } from '@/hooks';

import { formatDate } from '@/utils';

import { Collection, SubCollection } from '@/types';

interface UseEditDocProps<T> {
  collName: Collection | SubCollection;
  docId: string;
  dataToUpdate?: T;
}

export const useEditDoc = <
  T extends {
    [x: string]: any;
  } & AddPrefixToKeys<string, any>,
>({
  collName,
  docId,
  dataToUpdate,
}: UseEditDocProps<T>) => {
  const [editedData, setEditedData] = useState<T>(dataToUpdate);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('see');

  const { hideModal } = useHandleModal();

  const onEditSubmitClick = async (newData: T) => {
    if (anonymous) return alertAskJoinMember();

    const docRef = doc(dbService, collName, docId);
    await updateDoc(docRef, newData);
  };

  const onEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (editedData?.text === '<p><br></p>')
      return alert('한글자 이상 작성해주세요.');

    const docRef = doc(dbService, collName, docId);
    await updateDoc(docRef, {
      ...editedData,
      updatedAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    });

    hideModal();
  };

  return {
    editedData,
    setEditedData,
    onEditSubmit,
    onEditSubmitClick,
  };
};
