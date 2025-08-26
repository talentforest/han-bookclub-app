import useDeleteDoc from '@/hooks/handleFbDoc/useDeleteDoc';
import { FiTrash2 } from 'react-icons/fi';

interface PostDeleteBtnProps {
  docId: string;
  collName: string;
}

export default function PostDeleteBtn({ docId, collName }: PostDeleteBtnProps) {
  const { onDeleteClick } = useDeleteDoc({ docId, collName });

  return (
    <button onClick={onDeleteClick}>
      <FiTrash2 fontSize={15} stroke="#aaa" />
    </button>
  );
}
