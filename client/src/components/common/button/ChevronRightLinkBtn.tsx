import { Link } from 'react-router-dom';

import { FaChevronRight } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

interface ChevronRightLinkBtnProps<T> {
  to: string;
  title?: string;
  state?: T | null;
  className?: string;
  onClick?: (event: React.FormEvent) => void;
}

export default function ChevronRightLinkBtn<T>({
  title,
  to,
  state,
  className = '',
  onClick,
}: ChevronRightLinkBtnProps<T>) {
  return (
    <Link
      to={to}
      state={state}
      className={`flex items-center justify-end gap-1 text-gray1 ${className}`}
      onClick={onClick}
    >
      {title && (
        <>
          <span className="text-sm font-medium">{title}</span>
          <FiChevronRight className="" />
        </>
      )}

      {!title && <FaChevronRight className="" />}
    </Link>
  );
}
