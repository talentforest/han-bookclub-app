import { useEffect } from 'react';

import { dbService } from '@/fbase';
import { deleteDoc, doc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { currAuthUserAtom, userAtomFamily } from '@/data/userAtom';

import { getDocument } from '@/api';

import { USER } from '@/appConstants';

import { useHandleModal } from '@/hooks/common/useHandleModal';

import { existDocObj } from '@/utils';

import { Collection, SubCollection } from '@/types';

interface UseDeleteDocProps {
  collName: Collection | SubCollection;
  docId: string;
}

export const useDeleteDoc = ({ collName, docId }: UseDeleteDocProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const [userExtraData, setUserExtraData] = useRecoilState(userAtomFamily(uid));

  const docRef = doc(dbService, collName, docId);

  const { hideModal } = useHandleModal();

  useEffect(() => {
    if (uid && !existDocObj(userExtraData)) {
      getDocument(USER, uid, setUserExtraData);
    }
  }, [uid]);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');
    if (!confirm) return;

    await deleteDoc(docRef);

    hideModal();
  };

  return {
    onDeleteClick,
  };
};
