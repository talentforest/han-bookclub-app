import { dbService } from '@/fbase';
import { deleteDoc, doc } from 'firebase/firestore';

import { useHandleModal } from '@/hooks/common/useHandleModal';

import { Collection, SubCollection } from '@/types';

interface UseDeleteDocProps {
  collName: Collection | SubCollection;
  docId: string;
}

export const useDeleteDoc = ({ collName, docId }: UseDeleteDocProps) => {
  const docRef = doc(dbService, collName, docId);

  const { hideModal } = useHandleModal();

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
