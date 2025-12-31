import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { FiTrash2 } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { CHALLENGE } from '@/appConstants';

import { useDeleteDoc } from '@/hooks';

import { getPercentageNum } from '@/utils';

import { CompleteReadingChallengeBook } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import PagePosition from '@/components/challenge/PagePosition';
import Tag from '@/components/common/Tag';
import PageWithPercent from '@/components/common/book/PageWithPercent';

interface ChallengeBookCardProps {
  docId: string;
  creatorId: string;
  challengeBook: CompleteReadingChallengeBook;
}

export default function UserChallengeBookCard({
  docId,
  creatorId,
  challengeBook,
}: ChallengeBookCardProps) {
  const { wholePage, currentPage, ...book } = challengeBook;

  const [currentPageNum] = useState(currentPage);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { pathname } = useLocation();

  const { onDeleteClick } = useDeleteDoc({ collName: CHALLENGE, docId });

  const percentage = `${getPercentageNum(currentPage, wholePage)}%`;

  const status = percentage === '100%' ? 'success' : 'fail';

  const statusObj = {
    success: {
      title: '🎉 성공',
      color: 'green' as const,
      style: 'bg-white',
    },
    fail: {
      title: '😭 실패',
      color: 'red' as const,
      style: 'opacity-50 border border-gray3 bg-gray3',
    },
  };

  return (
    <div
      className={`rounded-2xl px-4 pb-3 pt-4 shadow-card ${statusObj[status].style}`}
    >
      <div className="relative">
        <FooterBookCard book={book} className="!pt-0" />

        {pathname === '/challenge' && uid === creatorId && (
          <button
            type="button"
            onClick={onDeleteClick}
            className="absolute right-0 top-0 flex gap-3"
          >
            <FiTrash2 fontSize={16} className="text-gray1" />
          </button>
        )}
      </div>

      <div className="flex items-end justify-between gap-x-1">
        <PageWithPercent currentPage={currentPageNum} wholePage={wholePage} />

        {status === 'success' && (
          <Tag
            text={statusObj[status].title}
            color={statusObj[status].color}
            className="min-w-fit !px-2.5 !py-1.5 !text-xs font-medium"
          />
        )}
      </div>

      <PagePosition percentage={percentage} />
    </div>
  );
}
