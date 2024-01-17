import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { IDocument } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import useDeleteDoc from 'hooks/handleFbDoc/useDeleteDoc';
import PostEditModal from './modal/PostEditModal';
import ShareBtn from 'components/atoms/buttons/ShareBtn';
import styled from 'styled-components';

interface Props {
  collName: string;
  post: IDocument;
}

const PostEditDeleteBox = ({ collName, post }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { pathname } = useLocation();

  const { onDeleteClick } = useDeleteDoc({ docId: post.id, collName });

  const onToggleClick = () => setIsEditing((prev) => !prev);

  const isShareBtn =
    (collName.includes('Subjects') || collName.includes('HostReview')) &&
    !pathname.includes('mybookshelf');

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
            title='새로운 발제자의 정리 기록이 등록되었어요~🚀'
            description='이번달 발제자의 정리 기록을 한번 보러 가볼까요?🤩'
            path='bookclub'
          />
        )}
      </BtnBox>

      {isEditing && (
        <PostEditModal
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
    margin-left: 8px;
  }
`;

export default PostEditDeleteBox;
