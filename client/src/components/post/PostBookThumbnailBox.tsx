import { useEffect, useState } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { IDocument } from 'data/documentsAtom';
import { IUserPostDocId, allUsersState, currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import PostHandleBtns, { PostType } from './PostHandleBtns';
import { HOST_REVIEW, REVIEW, SUBJECTS } from 'appConstants';
import { existDocObj, getFbRouteOfPost } from 'utils';

import Modal from 'components/common/Modal';
import BookThumbnail from 'components/common/book/BookThumbnail';
import EditorContent from 'components/common/editor/EditorContent';
import PostFooter from 'components/post/PostFooter';

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
    if (postType === '발제문') return getFbRouteOfPost(monthId, SUBJECTS);
    if (postType === '모임 후기') return getFbRouteOfPost(monthId, REVIEW);
    if (postType === '정리 기록') return getFbRouteOfPost(monthId, HOST_REVIEW);
  };

  useEffect(() => {
    if (docId) {
      getDocument(getPostRoute(), docId, setPost);
    }
  }, []);

  const handleModal = () => setOpenPostDetailModal(prev => !prev);

  const { thumbnail, title, createdAt, creatorId, text } = post;

  const isCurrentUser = currentUser.uid === creatorId;
  const findUser = allUsers?.find(user => user.id === creatorId);
  const userName = isCurrentUser ? '나' : findUser?.displayName;

  return (
    <>
      {existDocObj(post) && (
        <button type="button" onClick={handleModal} className="h-">
          <BookThumbnail thumbnail={thumbnail} title={title} />
        </button>
      )}

      {openPostDetailModal && (
        <Modal title={`${userName}의 ${postType}`} onToggleClick={handleModal}>
          <div className="overflow-scroll">
            <EditorContent text={text} />

            <div>
              {currentUser.uid === creatorId && (
                <PostHandleBtns
                  post={post}
                  collName={getPostRoute()}
                  postType={postType}
                />
              )}
            </div>

            <PostFooter createdAt={createdAt} footerType="likes" post={post} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostBookThumbnailBox;
