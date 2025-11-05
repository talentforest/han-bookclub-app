import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { allUsersAtom, currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { HOST_REVIEW, REVIEWS, SUBJECTS } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { existDocObj, getFbRouteOfPost } from '@/utils';

import { PostTypeName, UserPost, UserRecordId } from '@/types';

import Modal from '@/components/common/Modal';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditorContent from '@/components/common/editor/EditorContent';
import PostFooter from '@/components/post/PostFooter';
import PostHandleBtns from '@/components/post/PostHandleBtns';

interface PostBookThumbnailBoxProps {
  postId: UserRecordId;
  postType?: PostTypeName;
}

const PostBookThumbnailBox = ({
  postId,
  postType,
}: PostBookThumbnailBoxProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const allUsers = useRecoilValue(allUsersAtom);

  const [post, setPost] = useState({} as UserPost);

  const { docId, monthId } = postId;

  const { showModal } = useHandleModal();

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

  const { thumbnail, title, createdAt, creatorId, text } = post;

  const isCurrentUser = uid === creatorId;
  const findUser = allUsers?.find(user => user.id === creatorId);
  const userName = isCurrentUser ? '나' : findUser?.displayName;

  const toggleModal = () =>
    showModal({
      element: (
        <Modal title={`${userName}의 ${postType}`}>
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
      ),
    });

  return (
    <>
      {existDocObj(post) && (
        <button type="button" onClick={toggleModal}>
          <BookThumbnail
            thumbnail={thumbnail}
            title={title}
            className="w-full overflow-hidden !rounded-r-lg"
          />
        </button>
      )}
    </>
  );
};

export default PostBookThumbnailBox;
