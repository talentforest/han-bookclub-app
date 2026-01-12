import { useEffect, useState } from 'react';

import { limit, orderBy, where } from 'firebase/firestore';
import { FaChevronRight } from 'react-icons/fa';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { getSubCollectionGroup } from '@/api';

import {
  HOST_REVIEW,
  RECOMMENDED_BOOKS,
  REVIEWS,
  SUBJECTS,
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
  const { data: currUser } = useRecoilValue(currAuthUserAtom);

  const [{ data: postListByYear }, setPostList] =
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
    postListByYear?.reduce<{ [key: string]: UserPost[] }[]>((acc, curr) => {
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

  const { showModal } = useHandleModal();

  const toggleModal = (postList: UserPost[], yearMonthId: string) => {
    showModal({
      element: (
        <QuoteArticleModal
          title={postNameObj['subCollection'][postTypeKey]}
          postList={postList}
          yearMonthId={yearMonthId}
          collName={`BookClub-${yearMonthId.slice(0, 4)}/${yearMonthId}/${postTypeKey}`}
        />
      ),
    });
  };

  const displayList = {
    [SUBJECTS]: (postList: UserPost[]) => (
      <button
        type="button"
        disabled={limitNum === 1}
        onClick={() => toggleModal(postList, postList[0].yearMonthId)}
        className="w-full"
      >
        <FooterBookCard book={postList[0].clubBook} />
      </button>
    ),

    [HOST_REVIEW]: (postList: UserPost[]) => (
      <button
        type="button"
        disabled={limitNum === 1}
        onClick={() => toggleModal(postList, postList[0].yearMonthId)}
        className="w-full"
      >
        <FooterBookCard book={postList[0].clubBook} />
      </button>
    ),

    [RECOMMENDED_BOOKS]: (postList: UserPost[]) => (
      <ul className="grid grid-cols-1 divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
        {postList.map(post => (
          <li key={post.docId} className="w-full py-2">
            <button
              type="button"
              disabled={limitNum === 1}
              onClick={() => toggleModal([post], post.yearMonthId)}
              className="w-full"
            >
              <FooterBookCard book={post.recommendedBook} />
            </button>
          </li>
        ))}
      </ul>
    ),

    [REVIEWS]: (postList: UserPost[]) => {
      return (
        <button
          type="button"
          disabled={limitNum === 1}
          onClick={() => toggleModal(postList, postList[0].yearMonthId)}
          className="w-full"
        >
          <QuoteArticle isPreview subject={postList[0].text} />

          <div className="mt-2 flex w-full items-center">
            <span className="line-clamp-1 min-w-fit pr-1 text-sm font-medium text-blue3">
              {formatDate(postList[0].yearMonthId, 'yyyy년 M월')} |
            </span>
            <span className="line-clamp-1 pr-1 text-sm font-medium text-purple2">
              {postList[0]?.clubBook?.title || '이벤트'}
            </span>
            {limitNum !== 1 && (
              <FaChevronRight size={13} className="ml-auto text-gray2" />
            )}
          </div>
        </button>
      );
    },
  };

  return postListByYearMonthId?.length > 0 ? (
    <ul className="grid grid-cols-1 divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
      {postListByYearMonthId?.map(obj => {
        const [yearMonthId, postList] = Object.entries(obj)[0];

        const filterAnonymousList = postList.filter(post => !post.isAnonymous);
        const list = currUser.uid === userId ? postList : filterAnonymousList;

        return (
          list?.length > 0 && (
            <li key={yearMonthId} className="w-full py-2">
              {displayList[postTypeKey](list)}
            </li>
          )
        );
      })}
    </ul>
  ) : (
    <div className="text-gray2">
      아직 {postNameObj['subCollection'][postTypeKey]}이 없습니다
    </div>
  );
}
