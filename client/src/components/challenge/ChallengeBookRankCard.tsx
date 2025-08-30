import { PiShootingStarFill } from 'react-icons/pi';

import { BookRank } from '@/types';

import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface ChallengeBookRankCardProps {
  bookRank: BookRank;
  rank: number;
}

export default function ChallengeBookRankCard({
  bookRank,
  rank,
}: ChallengeBookRankCardProps) {
  const { title, thumbnail, counts, readers } = bookRank;

  return (
    <li className="min-h-fit w-full">
      <div className="relative">
        <BookThumbnail
          title={title}
          thumbnail={thumbnail}
          className={`mx-auto w-full rounded-md ${rank === 1 ? 'max-sm:w-[70%]' : 'max-sm:w-[62%]'}`}
        />
        <div className="absolute -bottom-4 right-0">
          <PiShootingStarFill className="size-[90px] fill-yellow-400" />
          <span className="absolute bottom-[42px] right-[27px] font-sans text-xl font-bold text-indigo-600">
            {rank}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Tag
          text={`📚총 ${counts}번 재독 중`}
          color="yellow"
          shape="rounded"
          className="!py-1.5 text-xs !text-green-600"
        />
        <Tag
          text={`🙋🏻멤버 ${readers}명이 재독 중`}
          color="lightBlue"
          shape="rounded"
          className="!py-1.5 text-xs !text-blue-600"
        />
      </div>
    </li>
  );
}
