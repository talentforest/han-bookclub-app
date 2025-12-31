import { formatDate } from '@/utils';

import { Collection, SubCollection, UserPost } from '@/types';

import LikeBtnWithPeopleInfo from '@/components/common/LikeBtnWithPeopleInfo';

interface PostFooterProps {
  post?: UserPost;
  createdAt: string;
  footerType?: 'likes';
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
      <span className="min-w-fit text-sm text-gray1">
        {formatDate(createdAt, 'yyyy.M.d. a h:mm')}
      </span>

      {footerType === 'likes' && (
        <LikeBtnWithPeopleInfo collName={collName} post={post} />
      )}
    </footer>
  );
}
