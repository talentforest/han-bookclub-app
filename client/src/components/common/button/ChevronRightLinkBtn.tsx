import { Link } from 'react-router-dom';

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
      className={`mt-3 flex items-center justify-end gap-1 text-sm text-gray1 ${className}`}
      onClick={onClick}
    >
      {title && <span className="font-medium">{title}</span>}
      <FiChevronRight className="" />
    </Link>
  );
}
