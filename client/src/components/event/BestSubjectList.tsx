import { useState } from 'react';

import { FaQuoteLeft } from 'react-icons/fa';

import { useHandleModal } from '@/hooks';

import { EventContent } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import EmptyCard from '@/components/common/container/EmptyCard';
import BestSubjectModal from '@/components/event/BestSubjectModal';

interface BestSubjectListProps {
  subjects: EventContent['result']['subjects'];
}

export default function BestSubjectList({ subjects }: BestSubjectListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { showModal } = useHandleModal();

  const onBestSubjectClick = () => {
    showModal({ element: <BestSubjectModal /> });
  };

  return subjects.length === 0 ? (
    <div className="rounded-xl bg-white p-4 shadow-card">
      <FaQuoteLeft className="float-left mr-2 size-14 bg-white pb-2 text-purple3" />
      <h3 className="mb-3 font-RomanticGumi text-lg font-medium tracking-tighter text-blue2">
        2025 최우수 발제문
      </h3>

      <BookThumbnail iconName="FiPlus" className="w-14 bg-white" />

      {subjects?.map(({ subject, clubBook }) => (
        <div key={subject} className="flex flex-col font-medium tracking-tight">
          <FooterBookCard book={clubBook} />

          <div>
            <span
              className="ql-editor min-h-12 !p-0 leading-6"
              dangerouslySetInnerHTML={{ __html: subject }}
              // dangerouslySetInnerHTML={{
              //   __html: isOpen
              //     ? subject
              //     : cutLetter(subject, 220),
              // }}
            />
          </div>

          <button
            type="button"
            className="ml-auto mt-2 w-fit px-2 py-2 text-sm font-medium text-gray1"
            onClick={() => setIsOpen(prev => !prev)}
          >
            {isOpen ? '접기' : '더보기'}
          </button>
        </div>
      ))}
    </div>
  ) : (
    <EmptyCard text="아직 최우수 발제문이 정해지지 않았어요!">
      <span className="text-xl">1위</span>
      <SquareBtn
        name="최우수 발제문 선택하기"
        handleClick={onBestSubjectClick}
      />
    </EmptyCard>
  );
}
