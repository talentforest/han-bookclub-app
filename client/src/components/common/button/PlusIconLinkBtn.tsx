import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import { PostTypeName } from '@/types';

interface PlusIconWithTextLinkProps {
  to: string;
  name: string;
  state?: { id?: string; postType?: PostTypeName; voteDocId?: number };
}

export default function PlusIconWithTextLink({
  to,
  name,
  state,
}: PlusIconWithTextLinkProps) {
  return (
    <Link
      to={to}
      state={state}
      className="mb-2 flex items-center gap-1 rounded-xl px-4 py-3"
    >
      <FiPlus className="text-lg text-blue1" />
      <span className="font-medium text-blue1">{name}</span>
    </Link>
  );
}
