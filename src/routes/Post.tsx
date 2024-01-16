import { Fragment, useEffect, useState } from 'react';
import {
  clubInfoByYearState,
  hostReviewState,
  subjectsState,
} from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getFbRoute, thisYear } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import HistoryClubBookBox from 'components/atoms/box/HistoryClubBookBox';
import Record from 'components/atoms/post/Record';
import AddPostModal from 'components/organisms/modal/AddPostModal';
import styled from 'styled-components';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

export default function Post() {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);

  const {
    state: { id, postType },
    pathname,
  } = useLocation();

  useEffect(() => {
    getCollection(`BookClub-${thisYear}`, setClubInfoDocs);
    getCollection(getFbRoute(id).HOST_REVIEW, setHostReview);
    getCollection(getFbRoute(id).SUBJECTS, setSubjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const document = clubInfoDocs?.find((doc) => doc.id === id);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');

  const toggleAddPostModal = () => {
    if (anonymous) return alertAskJoinMember();
    setOpenAddPostModal((prev) => !prev);
  };

  return (
    <Main>
      {document && <HistoryClubBookBox document={document} />}

      {pathname.includes('bookclub') && (
        <AddPostBtn onClick={toggleAddPostModal} type='button'>
          {postType === 'subjects' ? '발제문 추가하기' : '정리 기록 추가하기'}
        </AddPostBtn>
      )}

      {postType === 'subjects' &&
        subjects.map((subject, index) => (
          <Fragment key={subject.id}>
            <Record
              type='발제문'
              post={subject}
              collName={getFbRoute(id)?.SUBJECTS}
            />
            {subjects.length - 1 !== index && <div className='dividingLine' />}
          </Fragment>
        ))}

      {postType === 'host-review' && hostReview[0] && (
        <Record
          type='정리 기록'
          post={hostReview[0]}
          collName={getFbRoute(id)?.HOST_REVIEW}
        />
      )}

      {openAddPostModal && (
        <AddPostModal
          title={
            postType === 'subjects' ? '발제문 작성하기' : '정리 기록 작성하기'
          }
          toggleModal={toggleAddPostModal}
        />
      )}
    </Main>
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
