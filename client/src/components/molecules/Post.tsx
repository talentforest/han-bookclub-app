import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import EditorContent from '../atoms/editor/EditorContent';
import { PostType } from 'components/molecules/PostHandleBtns';

interface Props {
  type: PostType;
  post: IDocument;
  collName?: string;
  lineClamp?: number;
}

export default function Post({ type, post, collName, lineClamp }: Props) {
  const { createdAt, text } = post;

  return (
    <Article>
      <PostHeader collName={collName} post={post} postType={type} />

      <EditorContent lineClamp={lineClamp} text={text} />

      {!lineClamp && (
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
