import { useEffect, useState } from 'react';

import { getCollection } from '@/api';

import { BaseBookData, UserPost } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';

interface ChallengeRecommendedBookListByMonthProps {
  coll: string;
  onChallengeBookClick: (
    book: BaseBookData,
    reason?: string,
    recommendedUser?: string,
  ) => void;
}

export default function ChallengeRecommendedBookListByMonth({
  coll,
  onChallengeBookClick,
}: ChallengeRecommendedBookListByMonthProps) {
  const [recommenedBookListByMonth, setRecommenedBookListByMonth] = useState<
    UserPost[]
  >([]);

  useEffect(() => {
    if (recommenedBookListByMonth.length === 0) {
      getCollection(coll, setRecommenedBookListByMonth);
    }
  }, []);

  return (
    <>
      {recommenedBookListByMonth.map(({ recommendedBook, text, creatorId }) => (
        <li key={recommendedBook.title}>
          <button
            type="button"
            className="w-full"
            onClick={() =>
              onChallengeBookClick(recommendedBook, text, creatorId)
            }
          >
            <BookThumbnail
              title={recommendedBook.title}
              thumbnail={recommendedBook.thumbnail}
            />
          </button>
        </li>
      ))}
    </>
  );
}
