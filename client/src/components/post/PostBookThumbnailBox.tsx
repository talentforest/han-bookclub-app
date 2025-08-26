import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import PostHandleBtns from './PostHandleBtns';
import { getDocument } from '@/api/firebase/getFbDoc';
import { HOST_REVIEW, REVIEWS, SUBJECTS } from '@/appConstants';
import Modal from '@/components/common/Modal';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditorContent from '@/components/common/editor/EditorContent';
import PostFooter from '@/components/post/PostFooter';
import { allUsersAtom, currAuthUserAtom } from '@/data/userAtom';
import { PostTypeName, UserPost, UserPostDocId } from '@/types';
import { existDocObj, getFbRouteOfPost } from '@/utils';

interface PostBookThumbnailBoxProps {
  postId: UserPostDocId;
  postType?: PostTypeName;
}

const PostBookThumbnailBox = ({
  postId,
  postType,
}: PostBookThumbnailBoxProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const allUsers = useRecoilValue(allUsersAtom);
  const [post, setPost] = useState({} as UserPost);
  const [openPostDetailModal, setOpenPostDetailModal] = useState(false);

  const { docId, monthId } = postId;

  const getPostRoute = () => {
    if (postType === '발제문') return getFbRouteOfPost(monthId, SUBJECTS);
    if (postType === '모임 후기') return getFbRouteOfPost(monthId, REVIEWS);
    if (postType === '정리 기록') return getFbRouteOfPost(monthId, HOST_REVIEW);
  };

  useEffect(() => {
    if (docId) {
      getDocument(getPostRoute(), docId, setPost);
    }
  }, []);

  const handleModal = () => setOpenPostDetailModal(prev => !prev);

  const { thumbnail, title, createdAt, creatorId, text } = post;

  const isCurrentUser = uid === creatorId;
  const findUser = allUsers?.find(user => user.id === creatorId);
  const userName = isCurrentUser ? '나' : findUser?.displayName;

  return (
    <>
      {existDocObj(post) && (
        <button
          type="button"
          onClick={handleModal}
          className="w-full overflow-hidden rounded-md shadow-card"
        >
          <BookThumbnail
            thumbnail={thumbnail}
            title={title}
            className="max-h-60 w-full"
          />
        </button>
      )}

      {openPostDetailModal && (
        <Modal title={`${userName}의 ${postType}`} onToggleClick={handleModal}>
          <div className="overflow-scroll">
            <EditorContent text={text} />

            <div className="mb-4 mt-10 flex justify-end">
              {uid === creatorId && (
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
