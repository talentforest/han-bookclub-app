import { IDocument } from 'data/documentsAtom';

import LikeBtnWithPeopleInfo from '../common/LikeBtnWithPeopleInfo';
import { formatDate } from 'utils';

interface Props {
  post?: IDocument;
  createdAt: string;
  footerType?: 'likes';
  collName?: string;
}

export default function PostFooter({
  post,
  createdAt,
  footerType,
  collName,
}: Props) {
  return (
    <footer className="mt-4 flex items-center justify-between">
      <span className="text-sm text-gray1">{formatDate(createdAt)}</span>

      {footerType === 'likes' && (
        <LikeBtnWithPeopleInfo collName={collName} post={post} />
      )}
    </footer>
  );
}
