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

// import PostFooter from 'components/post/PostFooter';

interface LocationState {
  pathname: string;
  state: {
    id: string;
    postType: '발제문' | '정리 기록';
  };
}

export default function PostDetail() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(bookClubByYearState);
  const [hostReviews, setHostReviews] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  const { pathname, state } = useLocation() as LocationState;

  const { id, postType } = state;

  const year = id.slice(0, 4);

  useEffect(() => {
    getCollection(`BookClub-${year}`, setClubInfoDocs);
    getCollection(getFbRouteOfPost(id, HOST_REVIEW), setHostReviews);
    getCollection(getFbRouteOfPost(id, SUBJECTS), setSubjects);
  }, []);

  const document = clubInfoDocs?.find(doc => doc.id === id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    setOpenAddPostModal(prev => !prev);
  };

  const headerYearMonth =
    id === thisYearMonthId ? '이달' : formatDate(id, 'yy년 MM월');

  const posts = postType === '발제문' ? subjects : hostReviews;

  return (
    <>
      <MobileHeader
        title={`${headerYearMonth}의 한페이지 ${postType}`}
        backBtn
      />

      <main>
        {document && <BasicBookCard bookClub={document} />}

        {pathname.includes('bookclub') && (
          <SquareBtn
            type="button"
            color="blue"
            name={`${postType} 작성하기`}
            handleClick={toggleAddPostModal}
            className="mt-5 w-full py-3"
          />
        )}

        {!posts ? (
          <Loading className="h-[25vh]" />
        ) : (
          posts?.length !== 0 &&
          posts.map((post, index) => (
            <Fragment key={post.id}>
              <Post
                type={postType}
                post={post}
                collName={getFbRouteOfPost(
                  id,
                  postType === '발제문' ? SUBJECTS : HOST_REVIEW,
                )}
                className="mt-4 p-4 sm:p-0"
              >
                {/* <PostFooter
                  createdAt={post.createdAt}
                  footerType="likes"
                  post={post}
                /> */}
              </Post>
              {posts.length - 1 !== index && <DottedDividingLine />}
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
