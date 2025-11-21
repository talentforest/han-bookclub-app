import { useEffect, useState } from 'react';

import { FiUser } from 'react-icons/fi';

import { getDocument } from '@/api';

import { useHandleModal } from '@/hooks';

import { SubCollection, UserPost } from '@/types';

import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';
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
  const collName: Extract<
    SubCollection,
    `BookClub-${string}/${string}/RecommendedBooks`
  > = `BookClub-${year}/${monthId}/RecommendedBooks`;

  useEffect(() => {
    getDocument(collName, docId, setRecommendedBookDoc);
  }, []);

  const { recommendedBook, creatorId } = recommendedBookDoc || {};

  const onClick = () =>
    showModal({
      element: (
        <RecommendedBookModal
          recommendedBookDetail={recommendedBookDoc}
          collName={collName}
        />
      ),
    });

  return (
    <>
      {recommendedBookDoc?.recommendedBook && (
        <button
          type="button"
          onClick={onClick}
          className="relative mx-2 mt-7 min-h-[102px] w-full rounded-xl bg-white px-6 py-3 shadow-card"
        >
          <BookThumbnail
            title={recommendedBook.title}
            thumbnail={recommendedBook.thumbnail}
            className="!absolute bottom-4 w-[80px]"
          />

          <div className="ml-[90px] flex h-full flex-col items-start">
            <div className="flex items-center gap-0.5 text-gray1">
              <FiUser fontSize={14} className="text-gray2" />
              <span className="mr-2 text-sm text-gray2">추천인</span>
              <UserImgName userId={creatorId} isLink={false} />
            </div>

            <div className="mb-1 mt-1.5 flex flex-1 flex-col items-start">
              <span className="mb-1 line-clamp-2 text-start text-base font-medium leading-[20px]">
                {recommendedBook.title}
              </span>

              <BookAuthorPublisher
                authors={recommendedBook?.authors}
                publisher={recommendedBook?.publisher}
              />
            </div>
          </div>
        </button>
      )}
    </>
  );
}
