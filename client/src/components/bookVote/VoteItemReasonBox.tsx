import { BookVoteItem } from '@/types';

import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';
import Accordion from '@/components/common/container/Accordion';

interface VoteItemReasonBoxProps {
  voteItems: BookVoteItem[];
}

export default function VoteItemReasonBox({
  voteItems,
}: VoteItemReasonBoxProps) {
  return (
    <Accordion title="👀 작성자의 선정 이유 보기" className="my-4">
      <ul className="mb-4">
        {voteItems.map(({ selectReason, id, book }) => (
          <li key={id} className="flex w-full flex-col p-2 max-sm:px-0">
            <span className="mb-2 bg-green3 py-0.5 font-medium">
              📚 {book.title}
            </span>

            {selectReason ? (
              <p className="break-all">{selectReason}</p>
            ) : (
              <span>정보가 없습니다.</span>
            )}

            <ExternalLinkBtn
              url={book.url}
              title="책 상세정보 보러가기"
              className="text-purple2"
            />
          </li>
        ))}
      </ul>
    </Accordion>
  );
}
