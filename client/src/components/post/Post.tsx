import { ReactNode } from 'react';

import { Collection, PostTypeName, SubCollection, UserPost } from '@/types';

import EditorContent from '@/components/common/editor/EditorContent';
import PostHeader from '@/components/post/PostHeader';

interface PostProps {
  type: PostTypeName;
  post: UserPost;
  collName?: Collection | SubCollection;
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
      <EditorContent text={text.replaceAll('📍', '')} />
      {children}
    </article>
  );
}
