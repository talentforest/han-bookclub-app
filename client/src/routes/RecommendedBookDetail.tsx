import { useEffect, useState } from 'react';

import { getSubCollectionGroup } from '@/api';

import { RECOMMENDED_BOOKS, isLoadingStatus } from '@/appConstants';

import { LoadableStatus, UserPost } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import PostRecommendedBookCard from '@/components/post/recommendedBooks/PostRecommendedBookCard';

export default function RecommendedBookDetail() {
  const [{ status, data: bookList }, setBookList] =
    useState<LoadableStatus<UserPost[]>>(isLoadingStatus);

  useEffect(() => {
    if (!bookList) {
      getSubCollectionGroup(RECOMMENDED_BOOKS, setBookList);
    }
  }, []);

  return (
    <>
      <MobileHeader title="추천책 보기" backBtn />

      {status === 'loaded' && (
        <main>
          <ul className="flex flex-col gap-y-2">
            {bookList.map(({ yearMonthId, ...post }) => (
              <li key={post.docId}>
                <PostRecommendedBookCard
                  post={post}
                  collName={`BookClub-${yearMonthId.slice(0, 4)}/${yearMonthId}/RecommendedBooks`}
                />
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
