import { FaMedal } from 'react-icons/fa';

import { UserRank } from '@/types';

import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Accordion from '@/components/common/container/Accordion';
import UserImgName from '@/components/common/user/UserImgName';

interface ChallengeRereadingCardProps {
  userRank: UserRank;
}

export default function ChallengeUserRankCard({
  userRank,
}: ChallengeRereadingCardProps) {
  const { creatorId, rank, rereadingBookList, totalRereadingCounts } = userRank;

  return (
    <Accordion
      className="!h-[54px]"
      headerChildren={
        <div className="flex w-full items-center gap-x-2">
          {rank === 1 && <FaMedal className="mr-2 size-5 text-yellow-600" />}

          {totalRereadingCounts !== 0 && (
            <span className="font-RomanticGumi text-lg font-bold text-blue2">
              {rank}
              <span className="text-sm font-bold text-gray1">위</span>
            </span>
          )}

          <UserImgName userId={creatorId} className="ml-2 font-medium" />

          <Tag
            className="ml-auto !px-3 !py-1.5 font-GiantsInline !text-sm font-medium"
            text={`${rereadingBookList.length}권`}
            color="yellow"
          />
        </div>
      }
    >
      <div className="-mt-2 mb-3 flex items-start gap-x-4 pt-1">
        <ul className="w-[85px] pt-1.5">
          {[
            { key: '총 재독 수', value: `${totalRereadingCounts}회` },
            { key: '재독한 책', value: `${rereadingBookList.length}권` },
          ].map(({ key, value }) => (
            <li key={key} className="flex items-center justify-between pb-1">
              <span className="min-w-14 text-sm text-purple2">{key}</span>
              <span className="min-w-fit text-sm font-semibold">{value}</span>
            </li>
          ))}
        </ul>

        {rereadingBookList.length !== 0 && (
          <div className="-mx-2 flex flex-1 gap-x-2.5 overflow-scroll rounded-lg px-2.5 py-2 scrollbar-hide">
            {rereadingBookList.map(book => (
              <button key={book.title} type="button" onClick={() => {}}>
                <BookThumbnail
                  thumbnail={book.thumbnail}
                  title={book.title}
                  className="w-12 min-w-12"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Accordion>
  );
}
