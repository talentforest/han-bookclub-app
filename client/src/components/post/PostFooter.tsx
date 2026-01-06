import { formatDate } from '@/utils';

import { Collection, SubCollection, UserPost } from '@/types';

import LikeBtn from '@/components/common/LikeBtn';

interface PostFooterProps {
  post?: UserPost;
  createdAt: string;
  footerType?: 'like';
  collName?: Collection | SubCollection;
}

export default function PostFooter({
  post,
  createdAt,
  footerType,
  collName,
}: PostFooterProps) {
  return (
    <footer className="mt-4 flex items-center justify-between">
      <span className="min-w-fit text-sm tracking-tight text-gray1">
        {formatDate(createdAt, 'yyyy.M.d. a h:mm')}
      </span>

      {footerType === 'like' && <LikeBtn collName={collName} postLike={post} />}
    </footer>
  );
}
