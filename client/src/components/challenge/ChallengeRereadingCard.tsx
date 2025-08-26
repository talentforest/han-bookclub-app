import UserName from '@/components/common/user/UserName';
import { ChallengeRank } from '@/types';

interface ChallengeRereadingCardProps {
  userChallenge: ChallengeRank;
  creatorId: string;
}

export default function ChallengeRereadingCard({
  userChallenge,
  creatorId,
}: ChallengeRereadingCardProps) {
  const rereadingBookCounts = Object?.keys(userChallenge || {})?.filter(
    key =>
      !(
        key === 'id' ||
        key === 'creatorId' ||
        key === 'rank' ||
        key === 'totalCounts'
      ),
  )?.length;

  return (
    <li className="rounded-xl bg-white p-4 shadow-card">
      <div className="flex h-8 items-center justify-between">
        {userChallenge.totalCounts !== 0 && (
          <span className="mr-1 text-3xl font-bold">
            {userChallenge.rank === 1 && '🏆'}
            {userChallenge.rank}
            <span className="pb-2 text-lg font-bold text-gray1">위</span>
          </span>
        )}
        <UserName tag userId={creatorId} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span>총 재독 수</span>
        <span>{userChallenge.totalCounts}회</span>
      </div>

      <div className="flex items-center justify-between">
        <span>재독한 책</span>
        <span>{rereadingBookCounts}권</span>
      </div>
    </li>
  );
}
