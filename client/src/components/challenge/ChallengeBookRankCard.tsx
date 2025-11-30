// import { PiMedalFill } from 'react-icons/pi';
import { useHandleModal } from '@/hooks';

import { BookWithRank } from '@/types';

import ChallengeRankedBookModal from '@/components/challenge/ChallengeRankedBookModal';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface ChallengeBookRankCardProps {
  bookWithRank: BookWithRank;
}

export default function ChallengeBookRankCard({
  bookWithRank,
}: ChallengeBookRankCardProps) {
  const { title, thumbnail } = bookWithRank;

  const { showModal } = useHandleModal();

  const onClick = () => {
    showModal({
      element: <ChallengeRankedBookModal bookWithRank={bookWithRank} />,
    });
  };

  return (
    <li className="flex items-center justify-center">
      <button type="button" onClick={onClick} className="relative">
        <BookThumbnail title={title} thumbnail={thumbnail} className="w-full" />
        {/* <div className="absolute -bottom-3 -right-3">
          <PiMedalFill className="size-[60px] fill-yellow-400" />
          <span className="absolute bottom-[24px] right-[24px] font-RomanticGumi text-purple1">
            1
          </span>
        </div> */}
      </button>
    </li>
  );
}
