import { formatDate } from '@/utils';

import { UserPost } from '@/types';

import LikeBtnWithPeopleInfo from '@/components/common/LikeBtnWithPeopleInfo';

interface PostFooterProps {
  post?: UserPost;
  createdAt: string;
  footerType?: 'likes';
  collName?: string;
}

export default function PostFooter({
  post,
  createdAt,
  footerType,
  collName,
}: PostFooterProps) {
  return (
    <footer className="mt-4 flex items-center justify-between">
      <span className="text-sm text-gray1">{formatDate(createdAt)}</span>

      {footerType === 'likes' && (
        <LikeBtnWithPeopleInfo collName={collName} post={post} />
      )}
    </footer>
  );
}
