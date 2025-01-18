import { FiUserCheck } from 'react-icons/fi';

import UserName from 'components/common/user/UserName';

interface Props {
  creatorId: string;
}

export default function CreatorBox({ creatorId }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      <FiUserCheck
        fontSize={14}
        style={{ stroke: '#888', marginBottom: '3px' }}
      />
      <span className="text-sm text-gray2">작성자</span>
      <UserName tag userId={creatorId} />
    </div>
  );
}
