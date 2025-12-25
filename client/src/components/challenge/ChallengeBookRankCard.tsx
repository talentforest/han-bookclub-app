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
      </button>
    </li>
  );
}
