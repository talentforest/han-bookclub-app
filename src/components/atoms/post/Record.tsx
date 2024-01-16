import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

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

      <ContentBox
        $lineClamp={lineClamp}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {lineClamp === 'none' && (
        <PostFooter
          collName={collName}
          footerType={
            type === '발제문' || type === '정리 기록' ? 'share' : undefined
          }
          createdAt={createdAt}
        />
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

const ContentBox = styled.div<{ $lineClamp: number | 'none' }>`
  display: -webkit-box;
  line-clamp: ${(props) => props.$lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  min-height: ${(props) => (props.$lineClamp === 'none' ? '150px' : '20px')};
  flex: ${(props) => (props.$lineClamp === 'none' ? 0 : 1)};
  line-height: 1.6;
  li {
    line-height: 1.6;
  }
`;
