import { useEffect, useState } from 'react';

import { getSubCollectionGroup } from '@/api';

import { RECOMMENDED_BOOKS } from '@/appConstants';

import { UserPost } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import PostRecommendedBookCard from '@/components/post/recommendedBooks/PostRecommendedBookCard';

export default function RecommendedBookDetail() {
  const [bookList, setBookList] = useState<UserPost[]>([]);

  useEffect(() => {
    if (bookList.length === 0) {
      getSubCollectionGroup(RECOMMENDED_BOOKS, setBookList);
    }
  }, []);

  return (
    <>
      <MobileHeader title="추천책 보기" backBtn />

      <main>
        <ul className="flex flex-col gap-y-2">
          {bookList.map(({ yearMonthId, ...post }) => (
            <li key={post.id}>
              <PostRecommendedBookCard
                post={post}
                collName={`BookClub-${yearMonthId.slice(0, 4)}/${yearMonthId}/RecommendedBooks`}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
