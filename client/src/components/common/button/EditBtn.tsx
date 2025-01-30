import { FiEdit } from 'react-icons/fi';

interface EditBtnProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function EditBtn({
  onClick,
  disabled,
  className = '',
}: EditBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex size-[26px] items-center justify-center p-1 disabled:text-gray2 ${className}`}
    >
      <FiEdit className="size-full" />
    </button>
  );
}
