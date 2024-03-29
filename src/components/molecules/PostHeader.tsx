import { FiUserCheck } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { IDocument } from 'data/documentsAtom';
import PostHandleBtns, { PostType } from 'components/molecules/PostHandleBtns';
import styled from 'styled-components';
import UserName from 'components/atoms/UserName';

interface Props {
  collName: string;
  post: IDocument;
  postType?: PostType;
}

export default function PostHeader({ collName, post, postType }: Props) {
  const userData = useRecoilValue(currentUserState);

  const { creatorId } = post;

  return (
    <Header>
      <div>
        <FiUserCheck
          fontSize={13}
          style={{ stroke: '#888', marginBottom: '3px' }}
        />
        <span>{postType === '정리 기록' ? '이달의 발제자' : '작성자'}</span>
        <UserName tag userId={creatorId} />
      </div>

      {userData.uid === creatorId && collName && (
        <PostHandleBtns post={post} collName={collName} postType={postType} />
      )}
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 10px;

  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    > span {
      font-size: 14px;
      color: #666;
    }
  }
`;
