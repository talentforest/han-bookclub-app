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
import Tag from '@/components/common/Tag';
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
      <MobileHeader title="전체 추천책" backBtn />

      {status === 'loaded' && (
        <main>
          <ul className="flex flex-col gap-y-12">
            {bookListByYear.map(yearObj => (
              <li key={Object.keys(yearObj)[0]}>
                <Tag
                  text={`${Object.keys(yearObj)[0]}년의 추천책`}
                  color="lightBlue"
                />

                <ul className="mt-2 flex flex-col divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
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
