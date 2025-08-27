import { useEffect, useState } from 'react';

import { getDocument } from '@/api';

import { UserPost } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import RecommendedBookModal from '@/components/post/recommendedBooks/RecommendedBookModal';

interface PostRecommendedBookCardProps {
  docIds: { docId: string; monthId: string };
}

export default function PostRecommendedBookCard({
  docIds: { docId, monthId },
}: PostRecommendedBookCardProps) {
  const [openModal, setOpenModal] = useState(false);

  const [recommendedBookDoc, setRecommendedBookDoc] = useState<UserPost>();

  const year = monthId.slice(0, 4);
  const collection = `BookClub-${year}/${monthId}/RecommendedBooks/`;

  useEffect(() => {
    getDocument(collection, docId, setRecommendedBookDoc);
  }, []);

  const onToggleClick = () => setOpenModal(prev => !prev);

  const title = recommendedBookDoc?.recommendedBook?.title || '';
  const thumbnail = recommendedBookDoc?.recommendedBook?.thumbnail || '';

  return (
    <>
      {recommendedBookDoc && (
        <button type="button" onClick={onToggleClick} className="mb-10 h-full">
          <BookThumbnail title={title} thumbnail={thumbnail} />
        </button>
      )}

      {openModal && recommendedBookDoc && (
        <RecommendedBookModal
          onToggleClick={onToggleClick}
          recommendedBookDetail={recommendedBookDoc}
          collName={collection}
        />
      )}
    </>
  );
}
