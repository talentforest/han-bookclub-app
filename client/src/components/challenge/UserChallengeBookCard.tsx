import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { FiChevronRight, FiTrash2 } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { CHALLENGE } from '@/appConstants';

import { useDeleteDoc, useHandleModal } from '@/hooks';

import { formatDate, getPercentageNum } from '@/utils';

import { ChallengeBook } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import PagePosition from '@/components/challenge/PagePosition';
import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import PageWithPercent from '@/components/common/book/PageWithPercent';

interface ChallengeBookCardProps {
  docId: string;
  creatorId: string;
  challengeBook: ChallengeBook;
}

export default function UserChallengeBookCard({
  docId,
  creatorId,
  challengeBook,
}: ChallengeBookCardProps) {
  const { wholePage, currentPage, book, readingTimeList, impressionList } =
    challengeBook;

  const [currentPageNum] = useState(currentPage);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { pathname } = useLocation();

  const { onDeleteClick } = useDeleteDoc({ collName: CHALLENGE, docId });

  const { showModal } = useHandleModal();

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

  const toggleModal = () => {
    showModal({
      element: (
        <Modal title="완독 후기">
          <ul>
            {impressionList.map(impression => (
              <li key={impression.id} className="flex flex-col">
                <FooterBookCard book={book} className="!pt-0" />

                <p className="mb-5 mt-2 max-h-[52vh] overflow-scroll scrollbar-hide">
                  {impression.text}
                </p>
                <span className="text-sm text-gray1">
                  {formatDate(impression.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </Modal>
      ),
    });
  };

  return (
    <>
      {wholePage && currentPage && (
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

          {wholePage && currentPage && (
            <>
              <div className="flex items-end justify-between gap-x-1">
                <PageWithPercent
                  currentPage={currentPageNum}
                  wholePage={wholePage}
                />
                <Tag
                  text={statusObj[status].title}
                  color={statusObj[status].color}
                  className="mr-0.5 min-w-fit !px-2.5 !py-1.5 !text-xs font-medium"
                />
              </div>
              <PagePosition percentage={percentage} />
            </>
          )}
        </div>
      )}

      {readingTimeList.length !== 0 && (
        <button
          type="button"
          onClick={toggleModal}
          className={`flex w-full flex-col rounded-2xl bg-white px-4 pb-3 pt-4 shadow-card`}
        >
          <div className="relative w-full">
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

          <div className="ml-auto flex items-center gap-x-1">
            <span className="text-sm tracking-tighter text-gray1">
              완독 후기 보기
            </span>
            <FiChevronRight className="text-sm text-gray1" />
          </div>
        </button>
      )}
    </>
  );
}
