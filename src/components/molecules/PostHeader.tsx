import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { IDocument } from 'data/documentsAtom';
import PostHandleBtns, { PostType } from 'components/molecules/PostHandleBtns';
import styled from 'styled-components';
import CreatorBox from './CreatorBox';

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
      <CreatorBox creatorId={creatorId} />

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
`;
