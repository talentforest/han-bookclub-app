import { Link } from 'react-router-dom';

import { FaQuoteLeft } from 'react-icons/fa';

import { useHandleModal } from '@/hooks';

import { SubjectEventResult } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditBtn from '@/components/common/button/EditBtn';
import BestSubjectModal from '@/components/event/BestSubjectModal';
import Confetti from '@/components/event/Confetti';

interface BestSubjectListProps {
  subjects?: SubjectEventResult[];
}

export default function BestSubjectList({ subjects }: BestSubjectListProps) {
  const { showModal } = useHandleModal();

  const onHandleModalClick = ({
    rank,
    isEditing,
  }: {
    rank: number;
    isEditing?: boolean;
  }) => {
    showModal({
      element: <BestSubjectModal rank={rank} isEditing={isEditing} />,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Confetti title="최고의 발제문" />

      <ul className="z-10 flex flex-col gap-y-4">
        {subjects.length > 0 &&
          subjects?.map(
            ({ bestSubject, clubBook, yearMonthId, rank }, index) => (
              <li
                key={clubBook.title}
                className={`flex flex-col items-center shadow-card ${subjects.length === index + 1 ? '' : 'border-b-2 border-dotted pb-4'}`}
              >
                <div className="mb-3 flex w-full items-center justify-between gap-x-3">
                  <FooterBookCard
                    book={clubBook}
                    className="text-white [&>div>img]:!shadow-white [&>div>span]:text-white"
                  />

                  <div className="flex aspect-square size-14 flex-col items-center justify-center rounded-full bg-purple4">
                    <span className="font-GiantsInline text-xs leading-4 text-purple2">
                      Rank
                    </span>
                    <span className="font-GiantsInline text-lg leading-5 text-purple1">
                      {rank}
                    </span>
                  </div>
                </div>

                <p>
                  <FaQuoteLeft className="float-left mr-3 size-12 text-purple3" />
                  <span
                    className="text-white"
                    dangerouslySetInnerHTML={{ __html: bestSubject }}
                  />
                </p>

                <div className="flex w-full items-center">
                  <EditBtn
                    className="text-white"
                    onClick={() =>
                      onHandleModalClick({ rank, isEditing: true })
                    }
                  />
                  <Link
                    to={`/bookclub/${yearMonthId}/subjects`}
                    className="ml-auto w-fit px-2 py-1 text-sm font-medium text-purple3 underline"
                  >
                    전체 발제문 보기
                  </Link>
                </div>
              </li>
            ),
          )}
      </ul>

      <div className="z-10 mt-4 grid grid-cols-2 gap-4">
        {3 - subjects.length > 0 &&
          Array.from({ length: 3 - subjects.length }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-y-4 p-5 ${index === 0 && (subjects.length === 0 || subjects.length === 3) ? 'col-span-2' : ''}`}
            >
              <button
                type="button"
                onClick={() =>
                  onHandleModalClick({ rank: subjects.length + index + 1 })
                }
              >
                <BookThumbnail iconName="FiPlus" className="w-16 bg-white" />
              </button>

              <h3 className="font-RomanticGumi tracking-tighter text-blue3">
                발제문 {subjects.length + index + 1}위
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}
