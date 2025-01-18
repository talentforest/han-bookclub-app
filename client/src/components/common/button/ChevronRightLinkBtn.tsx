import { Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';

interface Props<T> {
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
}: Props<T>) {
  return (
    <Link
      to={to}
      state={state}
      className={`mt-4 flex items-center justify-end gap-1 ${className}`}
      onClick={onClick}
    >
      {title && <span className="text-sm font-medium">{title}</span>}
      <FiChevronRight className="mb-[1px]" />
    </Link>
  );
}
