import { UserRank } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';

interface ChallengeRereadingCardProps {
  userRank: UserRank;
}

export default function ChallengeUserRankCard({
  userRank,
}: ChallengeRereadingCardProps) {
  const { creatorId, rank, rereadingBookList, totalRereadingCounts } = userRank;

  return (
    <li
      className={`flex gap-x-3 rounded-xl bg-white p-4 shadow-card ${rereadingBookList.length !== 0 ? 'col-span-2' : ''}`}
    >
      <div
        className={`${rereadingBookList.length !== 0 ? 'w-[30%] min-w-28' : 'w-full'}`}
      >
        <div className="mb-2 flex h-8 items-center justify-between gap-2">
          {totalRereadingCounts !== 0 && (
            <span className="mr-1 font-RomanticGumi text-2xl font-bold text-blue2">
              {rank}
              <span className="pb-2 text-lg font-bold text-gray1">위</span>
            </span>
          )}
          <UserImgName userId={creatorId} className="text-lg" />
        </div>

        {[
          { key: '총 재독 수', value: `${totalRereadingCounts}회` },
          { key: '재독한 책', value: `${rereadingBookList.length}권` },
        ].map(({ key, value }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="min-w-20 text-purple2">{key}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {rereadingBookList.length !== 0 && (
        <div className="flex flex-1 gap-x-2 overflow-scroll px-2 py-1 scrollbar-hide">
          {rereadingBookList.map(book => (
            <BookThumbnail
              key={book.title}
              thumbnail={book.thumbnail}
              title={book.title}
              className="w-14 min-w-14"
            />
          ))}
        </div>
      )}
    </li>
  );
}
