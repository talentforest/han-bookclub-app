import { Fragment, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookClubByYearState } from 'data/bookClubAtom';
import { hostReviewState, subjectsState } from 'data/documentsAtom';
import { useRecoilState } from 'recoil';

import { HOST_REVIEW, SUBJECTS } from 'appConstants';
import { formatDate, getFbRouteOfPost, thisYearMonthId } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import BasicBookCard from 'components/bookCard/BasicBookCard';
import DottedDividingLine from 'components/common/DottedDividingLine';
import Loading from 'components/common/Loading';
import SquareBtn from 'components/common/button/SquareBtn';
import Post from 'components/post/Post';
import PostAddModal from 'components/post/PostAddModal';
import PostFooter from 'components/post/PostFooter';

interface LocationState {
  pathname: string;
  state: {
    id: string;
    postType: '발제문' | '정리 기록';
    postId: string;
  };
}

export default function PostListDetail() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(bookClubByYearState);

  const [hostReviews, setHostReviews] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  const {
    pathname,
    state: { id, postType, postId },
  } = useLocation() as LocationState;

  useEffect(() => {
    getCollection(`BookClub-${id.slice(0, 4)}`, setClubInfoDocs);
    getCollection(getFbRouteOfPost(id, HOST_REVIEW), setHostReviews);
    getCollection(getFbRouteOfPost(id, SUBJECTS), setSubjects);
  }, []);

  const document = clubInfoDocs?.find(doc => doc.id === id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    setOpenAddPostModal(prev => !prev);
  };

  const postInfo = {
    발제문: {
      postList: subjects,
      collName: getFbRouteOfPost(id, SUBJECTS),
    },
    '정리 기록': {
      postList: hostReviews,
      collName: getFbRouteOfPost(id, HOST_REVIEW),
    },
  };

  const { postList, collName } = postInfo[postType];

  const currPostList = postId
    ? postList.filter(post => post.id === postId)
    : postList;

  return (
    <>
      <MobileHeader
        title={`${id === thisYearMonthId ? '이달' : formatDate(id, 'yy년 MM월')}의 한페이지 ${postType}`}
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
                className="relative mt-4 p-4 max-sm:p-1 max-sm:pb-4"
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

        {openAddPostModal && (
          <PostAddModal postType={postType} toggleModal={toggleAddPostModal} />
        )}
      </main>
    </>
  );
}
