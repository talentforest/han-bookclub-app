import { Fragment, useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { clubByYearAtom } from '@/data/clubAtom';
import { hostReviewState, subjectsState } from '@/data/documentsAtom';

import { getCollection } from '@/api';

import { HOST_REVIEW, SUBJECTS } from '@/appConstants';

import { useAlertAskJoin, useHandleModal } from '@/hooks';

import { formatDate, getFbRouteOfPost, thisYearMonthId } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import BasicBookCard from '@/components/bookCard/BasicBookCard';
import DottedDividingLine from '@/components/common/DottedDividingLine';
import LoopLoading from '@/components/common/LoopLoading';
import SquareBtn from '@/components/common/button/SquareBtn';
import Post from '@/components/post/Post';
import PostAddModal from '@/components/post/PostAddModal';
import PostFooter from '@/components/post/PostFooter';

interface LocationState {
  pathname: string;
  state: { postId: string };
}

export default function PostListDetail() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubByYearAtom);
  const [hostReviews, setHostReviews] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  const { showModal } = useHandleModal();

  const { pathname, state } = useLocation() as LocationState;

  const params = useParams();

  const yearMonthId = params?.id ?? thisYearMonthId;
  const postType = pathname.includes('host-review') ? '정리 기록' : '발제문';
  const postId = state?.postId ?? '';

  const year = yearMonthId.slice(0, 4);

  useEffect(() => {
    getCollection(`BookClub-${year}`, setClubInfoDocs);
    getCollection(getFbRouteOfPost(yearMonthId, HOST_REVIEW), setHostReviews);
    getCollection(getFbRouteOfPost(yearMonthId, SUBJECTS), setSubjects);
  }, []);

  const document = clubInfoDocs?.find(doc => doc.id === yearMonthId);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    showModal({ element: <PostAddModal postType={postType} /> });
  };

  const postInfo = {
    발제문: {
      postList: subjects,
      collName: getFbRouteOfPost(yearMonthId, SUBJECTS),
    },
    '정리 기록': {
      postList: hostReviews,
      collName: getFbRouteOfPost(yearMonthId, HOST_REVIEW),
    },
  };

  const { postList, collName } = postInfo[postType];

  const currPostList = postId
    ? postList.filter(post => post.id === postId)
    : postList;

  return (
    <>
      <MobileHeader
        title={`${yearMonthId === thisYearMonthId ? '이달' : formatDate(yearMonthId, 'yyyy년 M월')}의 한페이지 ${postType}`}
        backBtn
      />

      <main>
        {document && <BasicBookCard bookClub={document} />}

        {!params?.id && (
          <SquareBtn
            type="button"
            color="darkBlue"
            name={`${postType} 작성하기`}
            handleClick={toggleAddPostModal}
            className="mt-5 w-full !py-3"
          />
        )}

        {!postInfo[postType]?.postList ? (
          <LoopLoading size={150} className="h-[55vh]" />
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
