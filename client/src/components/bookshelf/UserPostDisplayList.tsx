import { useEffect, useState } from 'react';

import { limit, orderBy, where } from 'firebase/firestore';
import { FaChevronRight } from 'react-icons/fa';

import { getSubCollectionGroup } from '@/api';

import {
  RECOMMENDED_BOOKS,
  isLoadingStatus,
  postNameObj,
} from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { formatDate } from '@/utils';

import { LoadableStatus, SubPostTypeKey, UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import QuoteArticle from '@/components/post/QuoteArticle';
import QuoteArticleModal from '@/components/post/QuoteArticleModal';

interface UserPostDisplayListProps {
  userId: string;
  postTypeKey: SubPostTypeKey;
  limitNum?: number;
}

export default function UserPostDisplayList({
  postTypeKey,
  userId,
  limitNum,
}: UserPostDisplayListProps) {
  const [{ data: postList }, setPostList] =
    useState<LoadableStatus<UserPost[]>>(isLoadingStatus);

  useEffect(() => {
    getSubCollectionGroup(
      postTypeKey,
      setPostList,
      where('creatorId', '==', userId),
      orderBy('createdAt', 'desc'),
      ...(limitNum ? [limit(limitNum)] : []),
    );
  }, []);

  const postListByYearMonthId = Object.values(
    postList?.reduce<{ [key: string]: UserPost[] }[]>((acc, curr) => {
      const key = curr.yearMonthId;
      const found = acc.find(obj => obj[key]);

      if (found) {
        found[key].push(curr);
      } else {
        acc.push({ [key]: [curr] });
      }
      return acc;
    }, []) || {},
  );

  const recommendedBooksType = postTypeKey === RECOMMENDED_BOOKS;

  const { showModal } = useHandleModal();

  const toggleModal = (postListByYearMonthId: UserPost[]) => {
    showModal({
      element: (
        <QuoteArticleModal
          title={`${postNameObj['subCollection'][postTypeKey]}`}
          postList={postListByYearMonthId}
        />
      ),
    });
  };

  return postListByYearMonthId?.length > 0 ? (
    <ul className="grid grid-cols-1 divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
      {postListByYearMonthId?.map(obj => {
        const [key, postList] = Object.entries(obj)[0];
        return (
          postList?.length > 0 && (
            <li key={key} className="w-full py-3">
              <button
                type="button"
                onClick={() => toggleModal(postList)}
                className="w-full"
              >
                {postTypeKey !== 'Reviews' ? (
                  <FooterBookCard
                    book={
                      recommendedBooksType
                        ? postList[0].recommendedBook
                        : postList[0].clubBook
                    }
                  />
                ) : (
                  <>
                    <QuoteArticle isPreview subject={postList[0].text} />

                    <div className="mt-2 flex w-full items-center">
                      <span className="line-clamp-1 min-w-fit pr-1 text-sm font-medium text-blue3">
                        {formatDate(postList[0].yearMonthId, 'yyyy년 M월')} |
                      </span>
                      <span className="line-clamp-1 pr-1 text-sm font-medium text-purple2">
                        {postList[0]?.clubBook?.title || '이벤트'}
                      </span>
                      <FaChevronRight
                        size={13}
                        className="ml-auto text-gray2"
                      />
                    </div>
                  </>
                )}
              </button>
            </li>
          )
        );
      })}
    </ul>
  ) : (
    <div className="text-gray2">아직 추천책이 없어요!</div>
  );
}
