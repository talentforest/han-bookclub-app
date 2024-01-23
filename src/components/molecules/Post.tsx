import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import PostHeader from '../atoms/post/PostHeader';
import PostFooter from '../atoms/post/PostFooter';
import PostContent from '../atoms/post/PostContent';
import { PostType } from 'components/organisms/PostEditDeleteBox';

interface Props {
  type: PostType;
  post: IDocument;
  collName?: string;
  lineClamp?: number;
}

export default function Post({ type, post, collName, lineClamp = 0 }: Props) {
  const { createdAt, text } = post;

  return (
    <Article>
      <PostHeader collName={collName} post={post} postType={type} />

      <PostContent lineClamp={lineClamp} text={text} />

      {lineClamp === 0 && (
        <PostFooter
          footerType='likes'
          post={post}
          collName={collName}
          createdAt={createdAt}
        />
      )}
    </Article>
  );
}

const Article = styled.article`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
