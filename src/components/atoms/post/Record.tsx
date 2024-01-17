import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostContent from './PostContent';

interface Props {
  type: '발제문' | '정리 기록' | '모임 후기' | '책 추천';
  post: IDocument;
  collName?: string;
  lineClamp?: number | 'none';
}

export default function Record({
  type,
  post,
  collName,
  lineClamp = 'none',
}: Props) {
  const { createdAt, text } = post;

  return (
    <Article>
      <PostHeader collName={collName} post={post} postType={type} />

      <PostContent lineClamp={lineClamp} text={text} />

      {lineClamp === 'none' && (
        <PostFooter collName={collName} createdAt={createdAt} />
      )}
    </Article>
  );
}

const Article = styled.article`
  min-height: 100px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
