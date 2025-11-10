import { FiTrash2 } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { formatDate } from '@/utils';

import { BookVote } from '@/types';

import CreatorBox from '@/components/common/user/CreatorBox';

interface VoteDetailHeaderProps {
  vote: BookVote;
  onVoteDeleteClick: () => void;
}

const VoteDetailHeader = ({
  vote,
  onVoteDeleteClick,
}: VoteDetailHeaderProps) => {
  const { creatorId, createdAt, title } = vote;

  const { uid } = useRecoilValue(currAuthUserAtom);

  return (
    <header className="flex flex-col items-center justify-between pb-3 max-sm:pb-0 max-sm:pt-3">
      <div className="mb-2 flex w-full items-center justify-between gap-4">
        {title && (
          <h3 className="text-xl font-medium max-sm:text-lg">{title}</h3>
        )}
        {uid === creatorId && (
          <button type="button" onClick={onVoteDeleteClick}>
            <FiTrash2 />
          </button>
        )}
      </div>

      <div className="flex w-full justify-between gap-2">
        <CreatorBox creatorId={creatorId} />
        <span className="text-gray1 max-sm:text-sm">
          {formatDate(createdAt, 'yyyy.M.d. HH:mm')}
        </span>
      </div>
    </header>
  );
};

export default VoteDetailHeader;
