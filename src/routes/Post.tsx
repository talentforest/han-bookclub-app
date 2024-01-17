import { Fragment, useEffect, useState } from 'react';
import {
  clubInfoByYearState,
  hostReviewState,
  subjectsState,
} from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  formattedYearMonth,
  getFbRoute,
  thisYear,
  thisYearMonthId,
} from 'util/index';
import { getCollection } from 'api/getFbDoc';
import HistoryClubBookBox from 'components/atoms/box/HistoryClubBookBox';
import Record from 'components/atoms/post/Record';
import PostAddModal from 'components/organisms/modal/PostAddModal';
import styled from 'styled-components';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import Header from 'layout/mobile/Header';

type PostType = '발제문' | '정리 기록';

interface LocationState {
  pathname: string;
  state: {
    id: string;
    postType: PostType;
  };
}

export default function Post() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  const {
    state: { id, postType },
    pathname,
  } = useLocation() as LocationState;

  useEffect(() => {
    getCollection(`BookClub-${thisYear}`, setClubInfoDocs);
    getCollection(getFbRoute(id).HOST_REVIEW, setHostReview);
    getCollection(getFbRoute(id).SUBJECTS, setSubjects);
  }, []);

  const document = clubInfoDocs?.find((doc) => doc.id === id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    setOpenAddPostModal((prev) => !prev);
  };

  const headerYearMonth =
    id === thisYearMonthId ? '이달' : formattedYearMonth(id);

  return (
    <>
      <Header title={`${headerYearMonth}의 한페이지 ${postType}`} backBtn />

      <Main>
        {document && <HistoryClubBookBox document={document} />}

        {pathname.includes('bookclub') && (
          <AddPostBtn onClick={toggleAddPostModal} type='button'>
            {postType === '발제문' ? '발제문 추가하기' : '정리 기록 추가하기'}
          </AddPostBtn>
        )}

        {postType === '발제문' &&
          subjects.map((subject, index) => (
            <Fragment key={subject.id}>
              <Record
                type='발제문'
                post={subject}
                collName={getFbRoute(id)?.SUBJECTS}
              />
              {subjects.length - 1 !== index && (
                <div className='dividingLine' />
              )}
            </Fragment>
          ))}

        {postType === '정리 기록' && hostReview[0] && (
          <Record
            type='정리 기록'
            post={hostReview[0]}
            collName={getFbRoute(id)?.HOST_REVIEW}
          />
        )}

        {openAddPostModal && (
          <PostAddModal
            title={
              postType === '발제문' ? '발제문 작성하기' : '정리 기록 작성하기'
            }
            toggleModal={toggleAddPostModal}
          />
        )}
      </Main>
    </>
  );
}

const AddPostBtn = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.blue};
  box-shadow: ${(props) => props.theme.boxShadow};
  color: #fff;
  font-size: 16px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .dividingLine {
    border-bottom: 2px dotted #ccc;
  }
`;
