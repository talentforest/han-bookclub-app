import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { IChallengeBook } from 'data/bookAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import PagePosition from './PagePosition';
import { CHALLENGE } from 'appConstants';
import { dbService } from 'fbase';
import { deleteDoc, doc } from 'firebase/firestore';
import { FiTrash2 } from 'react-icons/fi';

import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import PageWithPercent from 'components/common/book/PageWithPercent';
import UserName from 'components/common/user/UserName';

interface Props {
  docId: string;
  creatorId: string;
  challengeBook: IChallengeBook;
}

export default function ChallengeBookCard({
  docId,
  creatorId,
  challengeBook,
}: Props) {
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

  return (
    <li className="relative flex">
      <div className="relative flex-1 rounded-xl bg-white px-4 pb-3 pt-4 opacity-80 shadow-card">
        <div className="flex h-32 gap-4">
          <BookThumbnail title={title} thumbnail={thumbnail} />

          <div className="flex flex-1 flex-col justify-between">
            <div className="mb-2 flex items-center">
              <UserName userId={creatorId} tag />
              <span className="text-sm"> 의 챌린지!</span>
            </div>

            <h3 className="mb-1 font-medium">
              {title}{' '}
              <span className="text-sm font-normal text-gray1">완독하기</span>
            </h3>

            <BookAuthorPublisher authors={authors} publisher={publisher} />
            <div className="mt-auto">
              <PageWithPercent
                currentPage={currentPageNum}
                wholePage={wholePage}
              />
            </div>
          </div>

          {pathname === '/challenge' && uid === creatorId && (
            <div className="absolute right-3 top-3 flex gap-3">
              <button type="button" onClick={onDeleteClick}>
                <FiTrash2 fontSize={15} />
              </button>
            </div>
          )}
        </div>

        <PagePosition
          currentPage={currentPageNum}
          wholePage={wholePage}
          isEnd
        />
      </div>
    </li>
  );
}
