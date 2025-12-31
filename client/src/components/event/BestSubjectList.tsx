import { Link } from 'react-router-dom';

import { useHandleModal } from '@/hooks';

import { SubjectEventResult } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditBtn from '@/components/common/button/EditBtn';
import BestSubjectModal from '@/components/event/BestSubjectModal';
import Confetti from '@/components/event/Confetti';
import QuoteArticle from '@/components/post/QuoteArticle';

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

      <ul className="z-10 flex flex-col divide-y-2 divide-dotted [&>li:first-child]:!pt-0">
        {subjects.length > 0 &&
          subjects?.map(({ bestSubject, clubBook, yearMonthId, rank }) => (
            <li key={rank} className="py-3">
              {clubBook && (
                <div className="mb-2 flex w-full items-center justify-between gap-x-3">
                  <FooterBookCard
                    book={clubBook}
                    className="text-white [&>div>img]:!shadow-sm [&>div>img]:!shadow-white [&>div>span]:text-white"
                  />

                  {rank && (
                    <div className="flex aspect-square size-14 flex-col items-center justify-center rounded-full bg-purple4">
                      <span className="font-GiantsInline text-xs leading-4 text-purple2">
                        Rank
                      </span>
                      <span className="font-GiantsInline text-lg leading-5 text-purple1">
                        {rank}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <QuoteArticle subject={bestSubject} isDark>
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
              </QuoteArticle>
            </li>
          ))}
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
