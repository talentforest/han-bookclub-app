import { FiUserCheck } from 'react-icons/fi';

import UserName from 'components/common/user/UserName';

interface Props {
  creatorId: string;
}

export default function CreatorBox({ creatorId }: Props) {
  return (
    <div className="flex items-center gap-0.5 text-gray1">
      <FiUserCheck fontSize={14} />
      <span className="text-sm">작성자</span>
      <UserName tag userId={creatorId} />
    </div>
  );
}
