import { useHandleModal } from '@/hooks';

import { BookEventResult } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import RankStage from '@/components/common/container/RankStage';
import BestBookModal from '@/components/event/BestBookModal';
import Confetti from '@/components/event/Confetti';

interface BestBookListProps {
  books?: BookEventResult[];
  year: string;
}

export default function BestBookList({ books, year }: BestBookListProps) {
  const { showModal } = useHandleModal();

  const onClick = ({
    rank,
    isEditing,
  }: {
    rank: number;
    isEditing?: boolean;
  }) => {
    showModal({
      element: <BestBookModal year={year} rank={rank} isEditing={isEditing} />,
    });
  };

  const filterBookRank = (currRank: number) => {
    return books?.filter(({ rank }) => rank === currRank);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Confetti title="최고의 모임책" />

      <RankStage<BookEventResult>
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
              className="rotate-x-12 w-[74px] min-w-16 origin-bottom transform [&>img]:shadow-white"
            />
          </button>
        )}
      </RankStage>
    </div>
  );
}
