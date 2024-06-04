import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import PostDeleteBtn from 'components/atoms/button/PostDeleteBtn';
import PostEditBtn from 'components/atoms/button/PostEditBtn';

export type PostType =
  | '발제문'
  | '정리 기록'
  | '불참 후기'
  | '모임 후기'
  | '추천책'
  | '공유하고 싶은 문구';

interface Props {
  collName: string;
  post: IDocument;
  postType: PostType;
}

const PostHandleBtns = ({ collName, post, postType }: Props) => {
  return (
    <BtnsBox>
      <PostEditBtn collName={collName} post={post} postType={postType} />
      <PostDeleteBtn docId={post.id} collName={collName} />
    </BtnsBox>
  );
};

const BtnsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  > button {
    line-height: 0;
    padding: 2px 4px;
  }
`;

export default PostHandleBtns;
