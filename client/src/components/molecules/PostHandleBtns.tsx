import { IDocument } from 'data/documentsAtom';
import ShareBtn from 'components/atoms/button/ShareBtn';
import styled from 'styled-components';
import PostDeleteBtn from 'components/atoms/button/PostDeleteBtn';
import PostEditBtn from 'components/atoms/button/PostEditBtn';

export type PostType =
  | '발제문'
  | '정리 기록'
  | '모임 후기'
  | '책 추천'
  | '공유하고 싶은 문구';

interface Props {
  collName: string;
  post: IDocument;
  postType: PostType;
}

const PostHandleBtns = ({ collName, post, postType }: Props) => {
  const isShareBtn = postType === '발제문' || postType === '정리 기록';

  return (
    <BtnsBox>
      <PostEditBtn collName={collName} post={post} postType={postType} />

      <PostDeleteBtn docId={post.id} collName={collName} />

      {isShareBtn && (
        <ShareBtn
          title={`새로운 ${postType}이 등록되었어요~🚀`}
          description={`이번달 ${postType}을 한번 보러 가볼까요?🤩`}
          path='bookclub'
        />
      )}
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
