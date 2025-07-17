import UserName from '@/components/common/user/UserName';
import { FiUserCheck } from 'react-icons/fi';

interface Props {
  creatorId: string;
  isAnonymous?: boolean;
}

export default function CreatorBox({ creatorId, isAnonymous }: Props) {
  return (
    <div className="flex items-center gap-0.5 text-gray1">
      <FiUserCheck fontSize={14} />
      <span className="text-sm">작성자</span>
      {isAnonymous ? (
        <span className="text-sm">익명의 멤버</span>
      ) : (
        <UserName tag userId={creatorId} />
      )}
    </div>
  );
}
