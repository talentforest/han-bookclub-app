import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { dbService } from '@/fbase';
import { deleteDoc, doc } from 'firebase/firestore';
import { FiTrash2 } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { CHALLENGE } from '@/appConstants';

import { getPercentageNum } from '@/utils';

import { CompleteReadingChallengeBook } from '@/types';

import PagePosition from '@/components/challenge/PagePosition';
import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
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
  const { title, thumbnail, authors, publisher, wholePage, currentPage } =
    challengeBook;

  const [currentPageNum] = useState(currentPage);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { pathname } = useLocation();

  const docRef = doc(dbService, CHALLENGE, docId);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');
    if (!confirm) return;
    await deleteDoc(docRef);
  };

  const percentage = `${getPercentageNum(currentPage, wholePage)}%`;

  return (
    <li
      className={`rounded-xl border bg-white px-4 pb-3 pt-4 shadow-card ${percentage === '100%' ? 'border-green1' : 'border-pointCoral opacity-50'}`}
    >
      <div className="mb-2.5 flex flex-1">
        <div className="mr-4 flex flex-1 flex-col gap-1">
          <Tag
            text={percentage === '100%' ? '🎉 챌린지 성공' : '😭 챌린지 실패'}
            color={percentage === '100%' ? 'green' : 'red'}
            className="mb-1.5 min-w-fit font-medium"
          />

          <h3 className="font-medium leading-5">{title}</h3>
          <BookAuthorPublisher authors={authors} publisher={publisher} />

          {pathname === '/challenge' && uid === creatorId && (
            <div className="absolute right-3 top-3 flex gap-3">
              <button type="button" onClick={onDeleteClick}>
                <FiTrash2 fontSize={15} />
              </button>
            </div>
          )}

          <PageWithPercent currentPage={currentPageNum} wholePage={wholePage} />
        </div>

        <BookThumbnail title={title} thumbnail={thumbnail} className="w-20" />
      </div>

      <PagePosition percentage={percentage} />
    </li>
  );
}
