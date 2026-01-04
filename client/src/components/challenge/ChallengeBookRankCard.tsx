import { useHandleModal } from '@/hooks';

import { BookRank } from '@/types';

import ChallengeRankedBookModal from '@/components/challenge/ChallengeRankedBookModal';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface ChallengeBookRankCardProps {
  bookRank: BookRank;
}

export default function ChallengeBookRankCard({
  bookRank,
}: ChallengeBookRankCardProps) {
  const { title, thumbnail } = bookRank;

  const { showModal } = useHandleModal();

  const onClick = () => {
    showModal({
      element: <ChallengeRankedBookModal bookRank={bookRank} />,
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
