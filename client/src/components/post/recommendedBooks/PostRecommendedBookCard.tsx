import { useEffect, useState } from 'react';

import { getDocument } from '@/api/firebase/getFbDoc';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import RecommendedBookModal from '@/components/post/recommendedBooks/RecommendedBookModal';
import { IDocument } from '@/data/documentsAtom';

interface Props {
  docIds: { docId: string; monthId: string };
}

export default function PostRecommendedBookCard({
  docIds: { docId, monthId },
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const [recommendedBookDoc, setRecommendedBookDoc] = useState<IDocument>();

  const year = monthId.slice(0, 4);
  const collection = `BookClub-${year}/${monthId}/RecommendedBooks/`;

  useEffect(() => {
    getDocument(collection, docId, setRecommendedBookDoc);
  }, []);

  const onToggleClick = () => setOpenModal(prev => !prev);

  const {
    recommendedBook: { title, thumbnail },
  } = recommendedBookDoc || { recommendedBook: { title: '', thumbnail: '' } };

  return (
    <>
      {recommendedBookDoc && (
        <button type="button" onClick={onToggleClick} className="mb-10 h-full">
          <BookThumbnail title={title} thumbnail={thumbnail} />
        </button>
      )}

      {openModal && (
        <RecommendedBookModal
          onToggleClick={onToggleClick}
          recommendedBookDetail={recommendedBookDoc}
          collName={collection}
        />
      )}
    </>
  );
}
