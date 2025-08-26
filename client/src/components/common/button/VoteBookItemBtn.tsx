import { FaCheckCircle, FaCircle } from 'react-icons/fa';

interface VoteBookItemBtnProps {
  selected: boolean;
  onVoteItemClick: () => void;
}

export default function VoteBookItemBtn({
  selected,
  onVoteItemClick,
}: VoteBookItemBtnProps) {
  return (
    <button
      type="button"
      onClick={onVoteItemClick}
      className="flex w-full flex-col items-center justify-center bg-green1 py-5 text-white"
    >
      {selected ? (
        <FaCheckCircle className="size-5" />
      ) : (
        <FaCircle className="size-5" />
      )}
    </button>
  );
}
