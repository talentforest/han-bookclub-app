import { Fragment, useEffect, useState } from 'react';
import { hostReviewState, subjectsState } from 'data/documentsAtom';
import { bookClubByYearState } from 'data/bookClubAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getFbRoute, thisYearMonthId, formatKRMarkDate } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import BookClubHistoryBox from 'components/molecules/BookClubHistoryBox';
import Post from 'components/molecules/Post';
import PostAddModal from 'components/organisms/modal/PostAddModal';
import styled from 'styled-components';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import MobileHeader from 'layout/mobile/MobileHeader';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import Loading from 'components/atoms/Loading';

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

  const docPostType = pathname.includes('subjects') ? '발제문' : '정리 기록';
  const docId = pathname.includes('bookclub')
    ? thisYearMonthId
    : pathname.slice(9, 16);

  const { id, postType } = state || { id: docId, postType: docPostType };

  const year = id.slice(0, 4);

  useEffect(() => {
    getCollection(`BookClub-${year}`, setClubInfoDocs);
    getCollection(getFbRoute(id).HOST_REVIEW, setHostReviews);
    getCollection(getFbRoute(id).SUBJECTS, setSubjects);
  }, []);

  const document = clubInfoDocs?.find((doc) => doc.id === id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    setOpenAddPostModal((prev) => !prev);
  };

  const headerYearMonth =
    id === thisYearMonthId ? '이달' : formatKRMarkDate(id, 'YY년 MM월');

  const posts = postType === '발제문' ? subjects : hostReviews;

  return (
    <>
      <MobileHeader
        title={`${headerYearMonth}의 한페이지 ${postType}`}
        backBtn
      />

      <Main>
        {document && <BookClubHistoryBox document={document} />}

        {pathname.includes('bookclub') && (
          <AddPostBtn onClick={toggleAddPostModal} type='button'>
            {postType} 작성하기
          </AddPostBtn>
        )}

        {!posts ? (
          <Loading height='25vh' />
        ) : (
          posts &&
          posts?.length !== 0 &&
          posts.map((post, index) => (
            <Fragment key={post.id}>
              <Post
                type={postType}
                post={post}
                collName={
                  postType === '발제문'
                    ? getFbRoute(id)?.SUBJECTS
                    : getFbRoute(id)?.HOST_REVIEW
                }
              />
              {posts.length - 1 !== index && <DottedDividingLine />}
            </Fragment>
          ))
        )}

        {openAddPostModal && (
          <PostAddModal postType={postType} toggleModal={toggleAddPostModal} />
        )}
      </Main>
    </>
  );
}

const AddPostBtn = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.blue3};
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: #fff;
  font-size: 16px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
