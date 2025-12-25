import { FaMedal } from 'react-icons/fa';

import { UserRank } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import Accordion from '@/components/common/container/Accordion';
import UserImgName from '@/components/common/user/UserImgName';

interface ChallengeRereadingCardProps {
  userRank: UserRank;
  color?: 'dark' | 'light';
}

export default function ChallengeUserRankCard({
  userRank,
  color = 'light',
}: ChallengeRereadingCardProps) {
  const { creatorId, rank, rereadingBookList, totalRereadingCounts } = userRank;

  return (
    <Accordion
      className={`!py-[1px] ${color === 'dark' ? '!bg-darkGray' : ''}`}
      headerChildren={
        <div className="flex w-full items-center gap-x-2">
          {rank === 1 && <FaMedal className="size-5 text-yellow-300" />}

          {totalRereadingCounts !== 0 && (
            <span
              className={`font-RomanticGumi text-lg font-bold ${color === 'dark' ? 'text-white' : 'text-blue3'}`}
            >
              {rank}
              <span
                className={`text-sm font-bold ${color === 'dark' ? 'text-white' : 'text-blue3'}`}
              >
                위
              </span>
            </span>
          )}

          <UserImgName
            userId={creatorId}
            className={`ml-2 font-medium ${color === 'dark' ? 'text-white' : ''}`}
          />

          <span
            className={`ml-auto mr-1 font-GiantsInline font-medium ${color === 'dark' ? 'text-yellow-200' : 'text-blue3'}`}
          >
            {rereadingBookList.length}권
          </span>
        </div>
      }
    >
      <div className="mb-4 flex items-start gap-x-3">
        <ul className="mt-1 w-[85px]">
          {[
            { key: '총 재독 수', value: `${totalRereadingCounts}회` },
            { key: '재독한 책', value: `${rereadingBookList.length}권` },
          ].map(({ key, value }) => (
            <li key={key} className="flex items-center justify-between pb-1">
              <span className="min-w-14 text-sm text-blue4">{key}</span>
              <span className="min-w-fit text-sm font-semibold text-white">
                {value}
              </span>
            </li>
          ))}
        </ul>

        {rereadingBookList.length !== 0 && (
          <div className="flex flex-1 gap-x-2.5 overflow-scroll rounded-lg p-2 scrollbar-hide">
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
