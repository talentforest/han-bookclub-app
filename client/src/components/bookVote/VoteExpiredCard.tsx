import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getCollection } from '@/api/firebase/getFbDoc';
import { VOTED_ITEMS } from '@/appConstants';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserName from '@/components/common/user/UserName';
import { BookVote, BookVoteItemsByMember } from '@/types';
import { cutLetter } from '@/utils';
import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

interface VoteExpiredCardProps {
  vote: BookVote;
  collName: string;
}

export default function VoteExpiredCard({
  vote,
  collName,
}: VoteExpiredCardProps) {
  const [votedItemsByMember, setVotedItemsMyMember] = useState<
    BookVoteItemsByMember[]
  >([]);

  const { voteItems, title, id, createdAt, creatorId } = vote;

  useEffect(() => {
    if (!votedItemsByMember?.length) {
      getCollection(
        `${collName}/VoteId-${id}/${VOTED_ITEMS}`,
        setVotedItemsMyMember,
      );
    }
  }, []);

  return (
    <div className="group relative flex w-full flex-col justify-between rounded-card bg-white bg-opacity-65 p-4 opacity-80 shadow-card">
      <div className="mb-2 flex w-full items-center justify-between gap-4">
        <h4 className="line-clamp-1 w-4/5 flex-1 gap-1 truncate font-medium text-gray1">
          <MdOutlineHowToVote className="mb-1 inline size-5 pr-0.5 text-base" />
          {cutLetter(title, 40)}
        </h4>

        <span className="text-end text-sm text-gray1">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <UserName userId={creatorId} tag />

      <ul className="mb-3 mt-5 flex items-center justify-center gap-x-5">
        {voteItems.map(({ book: { title, thumbnail }, id }) => (
          <li key={id} className="relative h-28">
            <BookThumbnail title={title} thumbnail={thumbnail} />
          </li>
        ))}
      </ul>

      <Link
        to={`/vote/${id}`}
        state={{ collName, docId: id }}
        aria-label="상세보기"
        className="absolute right-4 top-[40%] flex size-12 items-center justify-center rounded-full border bg-gray1 opacity-20 group-hover:opacity-100"
      >
        <FiChevronRight className="text-xl text-white" />
      </Link>
    </div>
  );
}
