import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { IDocument } from 'data/documentsAtom';
import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import PostEditModal from '../../organisms/modal/PostEditModal';
import ShareBtn from 'components/atoms/button/ShareBtn';
import styled from 'styled-components';

export type PostType = '발제문' | '정리 기록' | '모임 후기' | '책 추천';

interface Props {
  collName: string;
  post: IDocument;
  postType: PostType;
}

const PostEditDeleteBox = ({ collName, post, postType }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { onDeleteClick } = useDeleteDoc({ docId: post.id, collName });

  const onToggleClick = () => setIsEditing((prev) => !prev);

  const isShareBtn = postType === '발제문' || postType === '정리 기록';

  return (
    <>
      <BtnBox>
        <button onClick={onToggleClick}>
          <FiEdit fontSize={15} stroke='#888' />
        </button>
        <button onClick={onDeleteClick}>
          <FiTrash2 fontSize={16} stroke='#888' />
        </button>

        {isShareBtn && (
          <ShareBtn
            title={`새로운 ${postType}이 등록되었어요~🚀`}
            description={`이번달 ${postType}을 한번 보러 가볼까요?🤩`}
            path='bookclub'
          />
        )}
      </BtnBox>

      {isEditing && (
        <PostEditModal
          postType={postType}
          post={post}
          collName={collName}
          onToggleClick={onToggleClick}
        />
      )}
    </>
  );
};

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  button {
    line-height: 0;
    padding: 2px;
    margin-left: 6px;
  }
`;

export default PostEditDeleteBox;
