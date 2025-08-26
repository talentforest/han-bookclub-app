import { useState } from 'react';

import { BookVoteItem } from '@/types';
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';

interface VoteItemReasonBoxProps {
  voteItems: BookVoteItem[];
}

export default function VoteItemReasonBox({
  voteItems,
}: VoteItemReasonBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => setIsOpen(prev => !prev);

  return (
    <div className="mb-10 mt-3 rounded-xl bg-white p-4 shadow-card max-sm:py-2.5">
      <button
        type="button"
        onClick={toggleDetails}
        className="flex w-full items-center gap-1"
      >
        <span className="block flex-1 text-start">
          👀 작성자의 간단한 선정 이유 보기
        </span>
        {isOpen ? (
          <FiChevronsUp className="text-gray1" />
        ) : (
          <FiChevronsDown className="text-gray1" />
        )}
      </button>

      <ul
        className={`flex gap-4 overflow-hidden transition-[max-height] duration-500 ease-in-out max-sm:flex-col ${
          isOpen ? 'max-h-[5000px]' : 'max-h-0'
        }`}
      >
        {voteItems.map(({ selectReason, id, book }) => (
          <li
            key={id}
            className="mt-2 flex w-full flex-col gap-2 px-2 pt-2 max-sm:px-0"
          >
            <span className="bg-green2 py-0.5 font-medium">
              📚 {book.title}
            </span>

            {selectReason ? (
              <p>{selectReason}</p>
            ) : (
              <span>정보가 없습니다.</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
