import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { IChallenge, IChallengeBook } from 'data/bookAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import PagePosition from './PagePosition';
import { CHALLENGE } from 'appConstants';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

// import { TbBlockquote } from 'react-icons/tb';

import ChallengeEditModal from 'components/challenge/ChallengeEditModal';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import PageWithPercent from 'components/common/book/PageWithPercent';
import UserName from 'components/common/user/UserName';

interface Props {
  challenge: IChallenge;
}

export default function ChallengeBookCard({ challenge }: Props) {
  const { creatorId, books, id } = challenge;

  const { uid } = useRecoilValue(currAuthUserAtom);
  const [openChallengeEditModal, setOpenChallengeEditModal] = useState(false);
  const [currChallengeBook, setCurrChallengeBook] = useState(books[0]);
  const [currentPageNum, setCurrentPageNum] = useState(
    currChallengeBook.currentPage,
  );
  // const [showSentenceModal, setShowSentenceModal] = useState(false);

  const { pathname } = useLocation();

  const { title, thumbnail, authors, publisher, wholePage } = currChallengeBook;

  const onChallengeEditModalClick = () =>
    setOpenChallengeEditModal(prev => !prev);
  // const onSentenceModalClick = () => setShowSentenceModal(prev => !prev);

  const docRef = doc(dbService, CHALLENGE, id);

  const otherChallengeBooks = books.filter(
    book => book.title !== currChallengeBook.title,
  );

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');
    if (!confirm) return;

    if (books.length > 1) {
      await updateDoc(docRef, {
        books: otherChallengeBooks,
      });
      setCurrChallengeBook(otherChallengeBooks[0]);
    } else {
      await deleteDoc(docRef);
    }
  };

  const onChangeCurrentBook = (challengeBook: IChallengeBook) => {
    setCurrChallengeBook(challengeBook);
    setCurrentPageNum(challengeBook.currentPage);
  };

  return (
    <li className="relative flex">
      {pathname === '/challenge' && otherChallengeBooks.length !== 0 && (
        <ul className="absolute right-1 top-[-40px] flex max-w-[77%] items-center justify-start gap-2 self-end overflow-scroll p-1">
          {otherChallengeBooks.map(book => (
            <li key={book.title}>
              <button
                type="button"
                onClick={() => onChangeCurrentBook(book)}
                className="h-[70px] [&>img]:m-0 [&>img]:rounded-lg"
              >
                <BookThumbnail title={book.title} thumbnail={book.thumbnail} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex-1 rounded-xl border bg-white p-4 shadow-card">
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
              {pathname === '/challenge' && uid === creatorId ? (
                <button
                  type="button"
                  onClick={onChallengeEditModalClick}
                  className="flex items-center"
                >
                  <FiEdit3 className="mr-1 stroke-gray2 text-[13px]" />
                  <PageWithPercent
                    currentPage={currentPageNum}
                    wholePage={wholePage}
                  />
                </button>
              ) : (
                <PageWithPercent
                  currentPage={currentPageNum}
                  wholePage={wholePage}
                />
              )}
            </div>
          </div>

          {pathname === '/challenge' && uid === creatorId && (
            <div className="absolute right-3 top-3 flex gap-3">
              {/* <button type="button" onClick={onSentenceModalClick}>
                <TbBlockquote fontSize={17} />
              </button> */}
              <button type="button" onClick={onDeleteClick}>
                <FiTrash2 fontSize={15} />
              </button>
            </div>
          )}
        </div>

        <PagePosition currentPage={currentPageNum} wholePage={wholePage} />
      </div>

      {openChallengeEditModal && (
        <ChallengeEditModal
          onModalClose={onChallengeEditModalClick}
          challenge={challenge}
          currChallengeBook={currChallengeBook}
          currentPageNum={currentPageNum}
          setCurrentPageNum={setCurrentPageNum}
        />
      )}

      {/* {showSentenceModal && (
        <SentenceAddModal
          book={{ title, thumbnail }}
          onToggleClick={onSentenceModalClick}
        />
      )} */}
    </li>
  );
}
