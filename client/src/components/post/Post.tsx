import { ReactNode } from 'react';

import PostHeader from './PostHeader';
import EditorContent from '@/components/common/editor/EditorContent';
import { PostTypeName, UserPost } from '@/types';

interface PostProps {
  type: PostTypeName;
  post: UserPost;
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
}: PostProps) {
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
