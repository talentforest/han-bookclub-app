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
    <li className="flex min-h-fit w-full items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        className={`relative self-center ${rank === 1 ? 'max-sm:w-[67%]' : 'max-sm:w-[58%]'}`}
      >
        <BookThumbnail
          title={title}
          thumbnail={thumbnail}
          className={`mx-auto w-full`}
        />
        <div className="absolute -bottom-4 -right-4">
          <PiShootingStarFill className="size-[90px] fill-yellow-400" />
          <span className="absolute bottom-[42px] right-[27px] font-sans text-xl font-bold text-indigo-600">
            {rank}
          </span>
        </div>
      </button>
    </li>
  );
}
