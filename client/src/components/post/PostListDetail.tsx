import { Fragment, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';
import { hostReviewState, subjectsState } from '@/data/documentsAtom';

import { getCollection } from '@/api';

import { HOST_REVIEW, SUBJECTS } from '@/appConstants';

import { useAlertAskJoin, useHandleModal } from '@/hooks';

import { formatDate, getFbRouteOfPost, thisYearMonthId } from '@/utils';

import MobileHeader from '@/layout/mobile/MobileHeader';

import BasicBookCard from '@/components/bookCard/BasicBookCard';
import DottedDividingLine from '@/components/common/DottedDividingLine';
import Loading from '@/components/common/Loading';
import SquareBtn from '@/components/common/button/SquareBtn';
import Post from '@/components/post/Post';
import PostAddModal from '@/components/post/PostAddModal';
import PostFooter from '@/components/post/PostFooter';

interface LocationState {
  pathname: string;
  state: {
    id: string;
    postType: '발제문' | '정리 기록';
    postId: string;
  };
}

export default function PostListDetail() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubByYearAtom);

  const [hostReviews, setHostReviews] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  const { showModal } = useHandleModal();

  const { pathname, state } = useLocation() as LocationState;

  const docId = state?.id ?? thisYearMonthId;
  const postType = pathname.includes('host-review') ? '정리 기록' : '발제문';
  const postId = state?.postId ?? '';

  useEffect(() => {
    getCollection(`BookClub-${docId.slice(0, 4)}`, setClubInfoDocs);
    getCollection(getFbRouteOfPost(docId, HOST_REVIEW), setHostReviews);
    getCollection(getFbRouteOfPost(docId, SUBJECTS), setSubjects);
  }, []);

  const document = clubInfoDocs?.find(doc => doc.id === docId);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    showModal({ element: <PostAddModal postType={postType} /> });
  };

  const postInfo = {
    발제문: {
      postList: subjects,
      collName: getFbRouteOfPost(docId, SUBJECTS),
    },
    '정리 기록': {
      postList: hostReviews,
      collName: getFbRouteOfPost(docId, HOST_REVIEW),
    },
  };

  const { postList, collName } = postInfo[postType];

  const currPostList = postId
    ? postList.filter(post => post.id === postId)
    : postList;

  return (
    <>
      <MobileHeader
        title={`${docId === thisYearMonthId ? '이달' : formatDate(docId, 'yy년 MM월')}의 한페이지 ${postType}`}
        backBtn
      />

      <main>
        {document && <BasicBookCard bookClub={document} />}

        {pathname.includes('bookclub') && (
          <SquareBtn
            type="button"
            color="darkBlue"
            name={`${postType} 작성하기`}
            handleClick={toggleAddPostModal}
            className="mt-5 w-full !py-3"
          />
        )}

        {!postInfo[postType]?.postList ? (
          <Loading className="h-[25vh]" />
        ) : (
          currPostList?.length !== 0 &&
          currPostList.map((post, index) => (
            <Fragment key={post.id}>
              <Post
                type={postType}
                post={post}
                collName={collName}
                className="relative mt-4 max-sm:pb-4"
              >
                <PostFooter
                  createdAt={post.createdAt}
                  footerType="likes"
                  post={post}
                  collName={collName}
                />
              </Post>
              {currPostList.length - 1 !== index && <DottedDividingLine />}
            </Fragment>
          ))
        )}
      </main>
    </>
  );
}
