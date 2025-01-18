import { currentUserState } from 'data/userAtom';
import { IBookVote } from 'data/voteAtom';
import { useRecoilValue } from 'recoil';

import { FiTrash2 } from 'react-icons/fi';
import { formatDate } from 'utils';

import CreatorBox from 'components/common/user/CreatorBox';

interface PropsType {
  vote: IBookVote;
  onVoteDeleteClick: () => void;
}

const VoteDetailHeader = ({ vote, onVoteDeleteClick }: PropsType) => {
  const { creatorId, createdAt, title } = vote;

  const { uid } = useRecoilValue(currentUserState);

  return (
    <header className="flex items-center justify-between pb-3 sm:flex-col sm:pb-0">
      <div className="flex w-full items-end gap-4 sm:mb-2 sm:justify-between">
        {title && <h3 className="text-xl font-medium sm:text-base">{title}</h3>}
        <span className="text-gray1 sm:text-sm">{formatDate(createdAt)}</span>
      </div>
      <div className="flex w-full gap-2">
        <CreatorBox creatorId={creatorId} />
        {uid === creatorId && (
          <button type="button" onClick={onVoteDeleteClick}>
            <FiTrash2 />
          </button>
        )}
      </div>
    </header>
  );
};

export default VoteDetailHeader;
