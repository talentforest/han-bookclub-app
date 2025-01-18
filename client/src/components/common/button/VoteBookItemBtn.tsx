import { FiCheckCircle, FiCircle } from 'react-icons/fi';

interface Props {
  selected: boolean;
  onVoteItemClick: () => void;
}

export default function VoteBookItemBtn({ selected, onVoteItemClick }: Props) {
  return (
    <button
      type="button"
      onClick={onVoteItemClick}
      className="flex w-full flex-col items-center justify-center border bg-green-200 py-5"
    >
      {selected ? (
        <FiCheckCircle className="size-4 text-green-700" />
      ) : (
        <FiCircle className="size-4 text-green-500" />
      )}
    </button>
  );
}
