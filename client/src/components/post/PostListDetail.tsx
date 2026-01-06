import { Fragment, useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import {
  hostReviewListAtomFamily,
  subjectListAtomFamily,
} from '@/data/documentsAtom';
import { fieldAndHostSelector } from '@/data/fieldAndHostAtom';

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
  const params = useParams();
  const yearMonthId = params?.id ?? thisYearMonthId;

  const { data: monthlyBookClub } = useRecoilValue(
    clubByMonthSelector(yearMonthId),
  );
  const fieldAndHosts = useRecoilValue(fieldAndHostSelector(yearMonthId));

  const [{ data: hostReviewList }, setHostReviews] = useRecoilState(
    hostReviewListAtomFamily(yearMonthId),
  );

  const [{ data: subjectList }, setSubjects] = useRecoilState(
    subjectListAtomFamily(yearMonthId),
  );

  const { pathname, state } = useLocation() as LocationState;

  const subjectCollName = getFbRouteOfPost(yearMonthId, SUBJECTS);
  const hostReviewCollName = getFbRouteOfPost(yearMonthId, HOST_REVIEW);

  useEffect(() => {
    getCollection(hostReviewCollName, setHostReviews);
    getCollection(subjectCollName, setSubjects);
  }, []);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const { showModal } = useHandleModal();

  const postType = pathname.includes('host-review') ? '정리 기록' : '발제문';
  const postId = state?.postId ?? '';

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    showModal({ element: <PostAddModal postType={postType} /> });
  };

  const postInfo = {
    발제문: {
      postList: subjectList,
      collName: subjectCollName,
    },
    '정리 기록': {
      postList: hostReviewList,
      collName: hostReviewCollName,
    },
  };

  const { postList, collName } = postInfo[postType];

  const currPostList = postId
    ? postList?.filter(post => post.docId === postId)
    : postList;

  return (
    <>
      <MobileHeader
        title={`${yearMonthId === thisYearMonthId ? '이달' : formatDate(yearMonthId, 'yyyy년 M월')}의 한페이지 ${postType}`}
        backBtn
      />

      <main>
        {document && (
          <BasicBookCard
            clubBook={monthlyBookClub?.book}
            fieldAndHosts={fieldAndHosts}
          />
        )}

        {!params?.id && (
          <SquareBtn
            type="button"
            color="blue"
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
            <Fragment key={post.docId}>
              <Post
                type={postType}
                post={post}
                collName={collName}
                className="relative mt-4 max-sm:pb-4"
              >
                <PostFooter
                  createdAt={post.createdAt}
                  footerType="like"
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
