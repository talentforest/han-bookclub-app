import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { IBookVote, IVoteItemsByMember } from 'data/voteAtom';

import { VOTED_ITEMS } from 'appConstants';
import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';
import { cutLetter } from 'utils';

import BookThumbnail from 'components/common/book/BookThumbnail';
import UserName from 'components/common/user/UserName';

interface Props {
  vote: IBookVote;
  collName: string;
}

export default function VoteExpiredCard({ vote, collName }: Props) {
  const [votedItemsByMember, setVotedItemsMyMember] = useState<
    IVoteItemsByMember[]
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
    <div className="group relative flex flex-col justify-between rounded-xl border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <MdOutlineHowToVote className="text-base text-gray2" />
        <h4 className="ml-1 flex flex-1 items-center gap-1 truncate font-medium">
          {cutLetter(title, 40)}
        </h4>

        <UserName userId={creatorId} tag />
      </div>

      <ul className="my-5 flex items-center justify-center gap-x-5">
        {voteItems.map(({ book: { title, thumbnail }, id }) => (
          <li key={id} className="relative h-28">
            <BookThumbnail title={title} thumbnail={thumbnail} />
          </li>
        ))}
      </ul>

      <span className="text-end text-sm text-gray2">
        {new Date(createdAt).toLocaleDateString()}
      </span>

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
