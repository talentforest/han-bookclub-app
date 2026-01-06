import { useEffect, useMemo, useState } from 'react';

import { orderBy } from 'firebase/firestore';

import { getSubCollectionGroup } from '@/api';

import {
  RECOMMENDED_BOOKS,
  isLoadingStatus,
  operationYearList,
} from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { LoadableStatus, SubCollection, UserPost } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import RecommendedBookModal from '@/components/post/recommendedBooks/RecommendedBookModal';

export default function RecommendedBookDetail() {
  const [{ status, data: bookList }, setBookList] =
    useState<LoadableStatus<UserPost[]>>(isLoadingStatus);

  useEffect(() => {
    if (!bookList) {
      getSubCollectionGroup(
        RECOMMENDED_BOOKS,
        setBookList,
        orderBy('createdAt', 'desc'),
      );
    }
  }, []);

  const bookListByYear = useMemo(() => {
    return operationYearList
      ?.map(year => {
        return {
          [year]: bookList?.filter(
            ({ yearMonthId }) => year === yearMonthId.slice(0, 4),
          ),
        };
      })
      ?.filter(yearItems => Object.values(yearItems)[0]?.length > 0);
  }, [bookList]);

  const { showModal } = useHandleModal();

  const onClick = (post: UserPost, collName: SubCollection) =>
    showModal({
      element: (
        <RecommendedBookModal
          recommendedBookDetail={post}
          collName={collName}
        />
      ),
    });

  return (
    <>
      <MobileHeader title="추천책 보기" backBtn />

      {status === 'loaded' && (
        <main>
          <ul className="flex flex-col gap-y-10">
            {bookListByYear.map(yearObj => (
              <li key={Object.keys(yearObj)[0]}>
                <h2 className="ml-1 text-lg font-medium tracking-tighter text-blue1">
                  {Object.keys(yearObj)[0]}년의 추천책
                </h2>
                <ul className="mt-1 flex flex-col divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
                  {Object.values(yearObj)[0].map(item => (
                    <li key={item.docId} className="py-1.5">
                      <button
                        type="button"
                        className="w-full"
                        onClick={() =>
                          onClick(
                            item,
                            `BookClub-${item.yearMonthId.slice(0, 4)}/${item.yearMonthId}/RecommendedBooks`,
                          )
                        }
                      >
                        <FooterBookCard book={item.recommendedBook} />
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
