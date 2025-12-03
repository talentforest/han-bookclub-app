import { Link } from 'react-router-dom';

import { FaQuoteLeft } from 'react-icons/fa';

import { useHandleModal } from '@/hooks';

import { EventContent } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import BestSubjectModal from '@/components/event/BestSubjectModal';

interface BestSubjectListProps {
  subjects?: EventContent['result']['subjects'];
}

export default function BestSubjectList({ subjects }: BestSubjectListProps) {
  const { showModal } = useHandleModal();

  const onClick = ({
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
    <>
      <div className="mt-4 rounded-2xl bg-white p-5 shadow-card">
        <Tag
          text="2025 최고의 발제문"
          color="purple"
          className="mx-auto mb-3 font-semibold"
        />

        <ul className="flex flex-col gap-y-4">
          {subjects.length > 0 &&
            subjects?.map(
              ({ bestSubject, clubBook, yearMonthId, rank }, index) => (
                <li
                  key={bestSubject}
                  className={`flex flex-col items-center ${subjects.length === index + 1 ? '' : 'border-b-2 border-dotted pb-4'}`}
                >
                  <div className="mb-3 flex w-full items-center justify-between gap-x-3">
                    <FooterBookCard book={clubBook} className="" />
                    <div className="flex aspect-square size-10 flex-col items-center justify-center rounded-full bg-purple4">
                      <span className="font-GiantsInline text-xs leading-4 text-purple2">
                        Rank
                      </span>
                      <span className="font-GiantsInline text-lg leading-6 text-purple2">
                        {rank}
                      </span>
                    </div>
                  </div>
                  <p>
                    <FaQuoteLeft className="float-left mr-3 size-12 bg-white text-purple3" />
                    <span dangerouslySetInnerHTML={{ __html: bestSubject }} />
                  </p>
                  <Link
                    to={`/bookclub/${yearMonthId}/subjects`}
                    className="ml-auto w-fit px-2 pb-2 text-sm font-medium text-purple2 underline"
                  >
                    전체 발제문 보기
                  </Link>
                </li>
              ),
            )}
        </ul>

        <div className="grid grid-cols-2 gap-4">
          {3 - subjects.length > 0 &&
            Array.from({ length: 3 - subjects.length }).map((_, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-y-4 p-5 ${index === 0 && subjects.length === 3 ? 'col-span-2' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => onClick({ rank: subjects.length + index + 1 })}
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
    </>
  );
}
