import { UserRank } from '@/types';

import UserName from '@/components/common/user/UserName';

interface ChallengeRereadingCardProps {
  userRank: UserRank;
}

export default function ChallengeUserRankCard({
  userRank,
}: ChallengeRereadingCardProps) {
  const { creatorId, rank, rereadingBookList, totalRereadingCounts } = userRank;

  return (
    <li className="rounded-xl bg-white p-4 shadow-card">
      <div className="flex h-8 items-center justify-between">
        {totalRereadingCounts !== 0 && (
          <span className="mr-1 text-3xl font-bold">
            {rank === 1 && '🏆'}
            {rank}
            <span className="pb-2 text-lg font-bold text-gray1">위</span>
          </span>
        )}
        <UserName tag userId={creatorId} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span>총 재독 수</span>
        <span>{totalRereadingCounts}회</span>
      </div>

      <div className="flex items-center justify-between">
        <span>재독한 책</span>
        <span>{rereadingBookList.length}권</span>
      </div>
    </li>
  );
}
