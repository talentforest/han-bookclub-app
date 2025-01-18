import { IDocument } from 'data/documentsAtom';

import LikeBtnInfoBox from '../common/LikeBtnInfoBox';
import { formatDate } from 'utils';

interface Props {
  post?: IDocument;
  createdAt: number;
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
      <span className="text-sm text-gray2">{formatDate(createdAt)}</span>

      {footerType === 'likes' && (
        <LikeBtnInfoBox collName={collName} post={post} />
      )}
    </footer>
  );
}
