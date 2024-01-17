import { IUserRecord, currentUserState } from 'data/userAtom';
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
import PostEditDeleteBox from '../PostEditDeleteBox';
import PostContent from 'components/atoms/post/PostContent';
// import RatingBox from '../RatingBox';

interface PropsType {
  recordId: IUserRecord;
  recordSort?: 'subjects' | 'reviews' | 'hostReview' | 'recommendedBook';
}

const BookImgRecordBox = ({ recordId, recordSort }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

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
          title={`나의 ${
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
          <BtnsBox>
            {userData.uid === creatorId && (
              <PostEditDeleteBox post={record} collName={getRecordRoute()} />
            )}
          </BtnsBox>

          <PostBox>
            <PostContent text={text} />

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
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 5px 0 0;
`;

const BtnsBox = styled.div`
  position: absolute;
  top: 16px;
  right: 13px;
`;

export default BookImgRecordBox;
