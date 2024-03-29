import { IUserPostDocId, allUsersState, currentUserState } from 'data/userAtom';
import { getFbRoute, existDocObj } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { getDocument } from 'api/getFbDoc';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookThumbnail from 'components/atoms/BookThumbnail';
import Modal from 'components/atoms/Modal';
import PostFooter from 'components/molecules/PostFooter';
import PostHandleBtns, { PostType } from '../molecules/PostHandleBtns';
import EditorContent from 'components/atoms/EditorContent';

interface PropsType {
  postId: IUserPostDocId;
  postType?: PostType;
}

const PostBookThumbnailBox = ({ postId, postType }: PropsType) => {
  const currentUser = useRecoilValue(currentUserState);
  const allUsers = useRecoilValue(allUsersState);
  const [post, setPost] = useState({} as IDocument);
  const [openPostDetailModal, setOpenPostDetailModal] = useState(false);

  const { docId, monthId } = postId;

  const getPostRoute = () => {
    if (postType === '발제문') return getFbRoute(monthId).SUBJECTS;
    if (postType === '모임 후기') return getFbRoute(monthId).MEETING_REVIEWS;
    if (postType === '정리 기록') return getFbRoute(monthId).HOST_REVIEW;
  };

  useEffect(() => {
    if (docId) {
      getDocument(getPostRoute(), docId, setPost);
    }
  }, []);

  const handleModal = () => setOpenPostDetailModal((prev) => !prev);

  const { thumbnail, title, createdAt, creatorId, text } = post;

  const isCurrentUser = currentUser.uid === creatorId;
  const findUser = allUsers?.find((user) => user.id === creatorId);
  const userName = isCurrentUser ? '나' : findUser?.displayName;

  return (
    <>
      {existDocObj(post) ? (
        <PostItem onClick={handleModal}>
          <BookThumbnail thumbnail={thumbnail} title={title} />
        </PostItem>
      ) : (
        <PostItem $skeleton>
          <svg></svg>
          <span></span>
          <span></span>
        </PostItem>
      )}

      {openPostDetailModal && (
        <Modal title={`${userName}의 ${postType}`} onToggleClick={handleModal}>
          <PostBox>
            <EditorContent text={text} />

            <BtnsBox>
              {currentUser.uid === creatorId && (
                <PostHandleBtns
                  post={post}
                  collName={getPostRoute()}
                  postType={postType}
                />
              )}
            </BtnsBox>

            <PostFooter createdAt={createdAt} footerType='likes' post={post} />
          </PostBox>
        </Modal>
      )}
    </>
  );
};

export const PostItem = styled.li<{ $skeleton?: boolean }>`
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

export default PostBookThumbnailBox;
