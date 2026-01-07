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
      className="mt-auto flex w-full flex-col items-center justify-center bg-blue4 py-4 text-white"
    >
      {selected ? (
        <FaCheckCircle className="size-5 text-blue3" />
      ) : (
        <FaCircle className="size-5" />
      )}
    </button>
  );
}
