import { FiTrash2 } from 'react-icons/fi';

import { useDeleteDoc } from '@/hooks';

import { SubCollection } from '@/types';

interface PostDeleteBtnProps {
  docId: string;
  collName: SubCollection;
}

export default function PostDeleteBtn({ docId, collName }: PostDeleteBtnProps) {
  const { onDeleteClick } = useDeleteDoc({ docId, collName });

  return (
    <button onClick={onDeleteClick}>
      <FiTrash2 fontSize={15} stroke="#aaa" />
    </button>
  );
}
