import { UserRank } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserName from '@/components/common/user/UserName';

interface ChallengeRereadingCardProps {
  userRank: UserRank;
}

export default function ChallengeUserRankCard({
  userRank,
}: ChallengeRereadingCardProps) {
  const { creatorId, rank, rereadingBookList, totalRereadingCounts } = userRank;

  return (
    <li
      className={`flex gap-x-4 rounded-xl bg-white p-4 shadow-card ${rereadingBookList.length !== 0 ? 'col-span-2' : ''}`}
    >
      <div
        className={`${rereadingBookList.length !== 0 ? 'w-[40%] min-w-32' : 'w-full'}`}
      >
        <div className="mb-2 flex h-8 items-center justify-between">
          {totalRereadingCounts !== 0 && (
            <span className="mr-1 text-3xl font-bold">
              {rank === 1 && '🏆'}
              {rank}
              <span className="pb-2 text-lg font-bold text-gray1">위</span>
            </span>
          )}
          <UserName userId={creatorId} className="text-lg" />
        </div>

        {[
          { key: '총 재독 수', value: `${totalRereadingCounts}회` },
          { key: '재독한 책', value: `${rereadingBookList.length}권` },
        ].map(({ key, value }) => (
          <div className="flex items-center justify-between">
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      {rereadingBookList.length !== 0 && (
        <div className="flex flex-1 gap-x-2 overflow-scroll scrollbar-hide">
          {rereadingBookList.map(book => (
            <BookThumbnail
              thumbnail={book.thumbnail}
              title={book.title}
              className="w-14 rounded-md border border-gray3 shadow-none"
            />
          ))}
        </div>
      )}
    </li>
  );
}
