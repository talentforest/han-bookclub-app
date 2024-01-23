import { IUserRecord, allUsersState, currentUserState } from 'data/userAtom';
import { getFbRoute, existDocObj } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Modal from 'components/atoms/Modal';
import PostFooter from 'components/atoms/post/PostFooter';
import PostEditDeleteBox from '../../organisms/PostEditDeleteBox';
import PostContent from 'components/atoms/post/PostContent';

interface PropsType {
  recordId: IUserRecord;
  recordSort?: 'subjects' | 'reviews' | 'hostReview' | 'recommendedBook';
}

const BookImgRecordBox = ({ recordId, recordSort }: PropsType) => {
  const currentUser = useRecoilValue(currentUserState);

  const allUsers = useRecoilValue(allUsersState);

  const { docId, monthId } = recordId;
  const [record, setRecord] = useState({} as IDocument);
  const [openModal, setOpenModal] = useState(false);

  const getRecordRoute = () => {
    if (recordSort === 'subjects') return getFbRoute(monthId).SUBJECTS;
    if (recordSort === 'reviews') return getFbRoute(monthId).REVIEWS;
    if (recordSort === 'hostReview') return getFbRoute(monthId).HOST_REVIEW;
  };

  useEffect(() => {
    if (docId) {
      getDocument(getRecordRoute(), docId, setRecord);
    }
  }, []);

  const handleModal = () => setOpenModal((prev) => !prev);

  const { thumbnail, title, createdAt, creatorId, text } = record;

  const isCurrentUser = currentUser.uid === creatorId;
  const findUser = allUsers?.find((user) => user.id === creatorId);
  const userName = isCurrentUser ? '나' : findUser?.displayName;

  return (
    <>
      {existDocObj(record) ? (
        <RecordItem onClick={handleModal}>
          <BookThumbnailImg thumbnail={thumbnail} title={title} />
        </RecordItem>
      ) : (
        <RecordItem $skeleton>
          <svg></svg>
          <span></span>
          <span></span>
        </RecordItem>
      )}

      {openModal && (
        <Modal
          title={`${userName}의 ${
            recordSort === 'hostReview'
              ? '모임 정리 기록'
              : recordSort === 'reviews'
              ? '모임 후기'
              : recordSort === 'subjects'
              ? '발제문'
              : ''
          }`}
          onToggleClick={handleModal}
        >
          <PostBox>
            <PostContent text={text} />

            <BtnsBox>
              {currentUser.uid === creatorId && (
                <PostEditDeleteBox post={record} collName={getRecordRoute()} />
              )}
            </BtnsBox>

            <PostFooter
              createdAt={createdAt}
              footerType='likes'
              post={record}
            />
          </PostBox>
        </Modal>
      )}
    </>
  );
};

export const RecordItem = styled.li<{ $skeleton?: boolean }>`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    max-width: 1000px;
  }
  @media ${device.tablet} {
  }
`;

const PostBox = styled.div`
  max-height: 80vh;
  margin: 5px 0 0;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BtnsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export default BookImgRecordBox;
