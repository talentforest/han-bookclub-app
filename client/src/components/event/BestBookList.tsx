import { useHandleModal } from '@/hooks';

import { EventContent } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import RankStage from '@/components/common/container/RankStage';
import BestBookModal from '@/components/event/BestBookModal';

interface BestBookListProps {
  books?: EventContent['result']['books'];
}

export default function BestBookList({ books }: BestBookListProps) {
  const { showModal } = useHandleModal();

  const onClick = ({
    rank,
    isEditing,
  }: {
    rank: number;
    isEditing?: boolean;
  }) => {
    showModal({
      element: <BestBookModal rank={rank} isEditing={isEditing} />,
    });
  };

  const filterBookRank = (currRank: number) => {
    return books?.filter(({ rank }) => rank === currRank);
  };

  return (
    // <div className="flex flex-col gap-y-0 rounded-2xl bg-white px-4 py-5 shadow-card">
    <RankStage<EventContent['result']['books'][number]>
      firstRank={filterBookRank(1)}
      secondRank={filterBookRank(2)}
      thirdRank={filterBookRank(3)}
    >
      {({ clubBook, rank }) => (
        <button
          type="button"
          key={rank}
          onClick={() => onClick({ rank, isEditing: !!clubBook })}
          style={{ transform: 'rotateX(20deg)' }}
        >
          <BookThumbnail
            iconName="FiPlus"
            title={clubBook ? clubBook.title : undefined}
            thumbnail={clubBook ? clubBook.thumbnail : undefined}
            className="rotate-x-12 w-16 min-w-16 origin-bottom transform bg-white"
          />
        </button>
      )}
    </RankStage>
    // </div>
  );
}
