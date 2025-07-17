import { ReactNode } from 'react';

import PostHeader from './PostHeader';
import EditorContent from '@/components/common/editor/EditorContent';
import { PostType } from '@/components/post/PostHandleBtns';
import { IDocument } from '@/data/documentsAtom';

interface Props {
  type: PostType;
  post: IDocument;
  collName?: string;
  className?: string;
  children?: ReactNode;
}

export default function Post({
  type,
  post,
  collName,
  className,
  children,
}: Props) {
  const { text } = post;

  return (
    <article
      className={`flex min-h-[80px] w-full flex-col gap-2.5 ${className}`}
    >
      <PostHeader collName={collName} post={post} postType={type} />
      <EditorContent text={text} />
      {children}
    </article>
  );
}
