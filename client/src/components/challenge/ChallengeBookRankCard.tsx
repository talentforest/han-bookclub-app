import { PiShootingStarFill } from 'react-icons/pi';

import { useHandleModal } from '@/hooks';

import { BookWithRank } from '@/types';

import ChallengeRankedBook from '@/components/challenge/ChallengeRankedBook';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface ChallengeBookRankCardProps {
  bookWithRank: BookWithRank;
  rank: number;
}

export default function ChallengeBookRankCard({
  bookWithRank,
  rank,
}: ChallengeBookRankCardProps) {
  const { title, thumbnail } = bookWithRank;

  const { showModal } = useHandleModal();

  const onClick = () => {
    showModal({ element: <ChallengeRankedBook bookWithRank={bookWithRank} /> });
  };

  return (
    <li className="flex items-center justify-center">
      <button type="button" onClick={onClick} className="relative">
        <BookThumbnail title={title} thumbnail={thumbnail} className="w-20" />
        <div className="absolute -bottom-4 -right-4">
          <PiShootingStarFill className="size-[80px] fill-yellow-400" />
          <span className="absolute bottom-[35px] right-[24px] font-GiantsInline text-xl font-bold text-purple1">
            {rank}
          </span>
        </div>
      </button>
    </li>
  );
}
