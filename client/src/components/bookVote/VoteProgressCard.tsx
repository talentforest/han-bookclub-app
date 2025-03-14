import { Link } from 'react-router-dom';

import { IBookVote } from 'data/voteAtom';

import { BOOK_VOTE } from 'appConstants';
import { FiChevronRight } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';

import DDay from 'components/common/DDay';
import BookThumbnail from 'components/common/book/BookThumbnail';

interface PropsType {
  voteDetail: IBookVote;
}

const VoteProgressCard = ({ voteDetail }: PropsType) => {
  const { id, title, voteItems, deadline } = voteDetail;

  return (
    <div className="flex w-fit flex-col justify-between rounded-xl bg-white p-5 shadow-card">
      <h4 className="mb-3 flex gap-1 border">
        <MdOutlineHowToVote className="text-base text-pointBlue" />

        {title}
      </h4>

      <ul className="flex gap-6">
        {voteItems.map(({ id, book }) => (
          <li key={id} className="h-32">
            <BookThumbnail thumbnail={book.thumbnail} title={book.title} />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-2">
        <DDay hyphenDate={deadline} isDateMark={false} />
        <Link
          to={`/vote/${id}`}
          state={{ collName: BOOK_VOTE, docId: id }}
          className="flex items-center justify-end gap-0.5 py-0.5"
        >
          <span className="text-sm text-gray1">투표하러 가기</span>
          <FiChevronRight className="text-sm text-gray1" />
        </Link>
      </div>
    </div>
  );
};

export default VoteProgressCard;
