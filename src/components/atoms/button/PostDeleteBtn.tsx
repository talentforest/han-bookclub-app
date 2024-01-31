import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import { FiTrash2 } from 'react-icons/fi';

interface Props {
  docId: string;
  collName: string;
}

export default function PostDeleteBtn({ docId, collName }: Props) {
  const { onDeleteClick } = useDeleteDoc({ docId, collName });

  return (
    <button onClick={onDeleteClick}>
      <FiTrash2 fontSize={15} stroke='#888' />
    </button>
  );
}
