import { FiUserCheck } from 'react-icons/fi';

import UserImgName from '@/components/common/user/UserImgName';

interface CreatorBoxProps {
  creatorId: string;
  isAnonymous?: boolean;
}

export default function CreatorBox({
  creatorId,
  isAnonymous,
}: CreatorBoxProps) {
  return (
    <div className="flex items-center gap-0.5 text-gray1">
      <FiUserCheck fontSize={14} />
      <span className="mr-2 text-sm">작성자</span>

      {isAnonymous ? (
        <span className="text-sm">익명의 멤버</span>
      ) : (
        <UserImgName userId={creatorId} isLink={false} />
      )}
    </div>
  );
}
