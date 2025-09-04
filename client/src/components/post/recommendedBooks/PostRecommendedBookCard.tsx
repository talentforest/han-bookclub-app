import { useEffect, useState } from 'react';

import { getDocument } from '@/api';

import { useHandleModal } from '@/hooks';

import { UserPost } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import RecommendedBookModal from '@/components/post/recommendedBooks/RecommendedBookModal';

interface PostRecommendedBookCardProps {
  docIds: { docId: string; monthId: string };
}

export default function PostRecommendedBookCard({
  docIds: { docId, monthId },
}: PostRecommendedBookCardProps) {
  const [recommendedBookDoc, setRecommendedBookDoc] = useState<UserPost>();

  const { showModal } = useHandleModal();

  const year = monthId.slice(0, 4);
  const collection = `BookClub-${year}/${monthId}/RecommendedBooks/`;

  useEffect(() => {
    getDocument(collection, docId, setRecommendedBookDoc);
  }, []);

  const title = recommendedBookDoc?.recommendedBook?.title || '';
  const thumbnail = recommendedBookDoc?.recommendedBook?.thumbnail || '';

  return (
    <>
      {recommendedBookDoc && (
        <button
          type="button"
          onClick={() =>
            showModal({
              element: (
                <RecommendedBookModal
                  recommendedBookDetail={recommendedBookDoc}
                  collName={collection}
                />
              ),
            })
          }
          className="mb-10 h-40"
        >
          <BookThumbnail title={title} thumbnail={thumbnail} />
        </button>
      )}
    </>
  );
}
