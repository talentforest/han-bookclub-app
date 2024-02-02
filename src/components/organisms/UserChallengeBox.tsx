import { cutLetter } from 'util/index';
import { IChallenge, IChallengeBook } from 'data/bookAtom';
import { useLocation } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { CHALLENGE } from 'constants/index';
import { TbBlockquote } from 'react-icons/tb';
import BookThumbnail from '../atoms/BookThumbnail';
import UserName from 'components/atoms/UserName';
import ChallengeEditModal from 'components/organisms/modal/ChallengeEditModal';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';
import PagePosition from '../molecules/PagePosition';
import SentenceAddModal from 'components/organisms/modal/SentenceAddModal';

interface Props {
  challenge: IChallenge;
}

export default function UserChallengeBox({ challenge }: Props) {
  const { creatorId, books, id } = challenge;

  const currentUser = useRecoilValue(currentUserState);
  const [openChallengeEditModal, setOpenChallengeEditModal] = useState(false);
  const [currChallengeBook, setCurrChallengeBook] = useState(books[0]);
  const [currentPageNum, setCurrentPageNum] = useState(
    currChallengeBook.currentPage
  );
  const [showSentenceModal, setShowSentenceModal] = useState(false);

  const { pathname } = useLocation();

  const { title, thumbnail, authors, publisher, wholePage } = currChallengeBook;

  const onChallengeEditModalClick = () =>
    setOpenChallengeEditModal((prev) => !prev);
  const onSentenceModalClick = () => setShowSentenceModal((prev) => !prev);

  const docRef = doc(dbService, CHALLENGE, id);

  const otherChallengeBooks = books.filter(
    (book) => book.title !== currChallengeBook.title
  );

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
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
    <div>
      <ChallengeBook>
        <BookBox>
          {pathname === '/challenge' && currentUser.uid === creatorId && (
            <BtnBox>
              <button type='button' onClick={onSentenceModalClick}>
                <TbBlockquote fontSize={17} />
              </button>

              <button type='button' onClick={onDeleteClick}>
                <FiTrash2 fontSize={15} />
              </button>
            </BtnBox>
          )}

          <BookThumbnail title={title} thumbnail={thumbnail} />

          <div className='info'>
            <UserName creatorId={creatorId} fontSize={15} />
            <div>
              <h3>{title ? cutLetter(title, 40) : '이벤트'}</h3>
              <BookAuthorPublisher authors={authors} publisher={publisher} />
            </div>
          </div>
        </BookBox>

        <PagePosition
          currentPage={currentPageNum}
          wholePage={wholePage}
          editable={currentUser.uid === creatorId}
          onEditClick={onChallengeEditModalClick}
        />
      </ChallengeBook>

      {pathname === '/challenge' && otherChallengeBooks.length !== 0 && (
        <OtherChallengeBook>
          {otherChallengeBooks.map((book) => (
            <button
              key={book.title}
              type='button'
              onClick={() => onChangeCurrentBook(book)}
            >
              <BookThumbnail title={book.title} thumbnail={book.thumbnail} />
            </button>
          ))}
        </OtherChallengeBook>
      )}

      {openChallengeEditModal && (
        <ChallengeEditModal
          onModalClose={onChallengeEditModalClick}
          challenge={challenge}
          currChallengeBook={currChallengeBook}
          currentPageNum={currentPageNum}
          setCurrentPageNum={setCurrentPageNum}
        />
      )}

      {showSentenceModal && (
        <SentenceAddModal
          book={{ title, thumbnail }}
          onToggleClick={onSentenceModalClick}
        />
      )}
    </div>
  );
}

const ChallengeBook = styled.li`
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px 8px 8px;
  flex: 1;
  margin-top: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookBox = styled.div`
  flex: 1;
  display: flex;
  > img {
    height: 90px;
    margin-top: -24px;
  }
  > .info {
    min-height: 72px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    justify-content: space-between;
    padding: 0 4px;
    margin-left: 5px;
    flex: 1;
    height: 100%;
    padding-bottom: 4px;
    > div {
      h3 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 16px;
        line-height: 1.4;
        margin-bottom: 4px;
      }
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  position: absolute;
  right: 8px;
  top: 4px;
  gap: 4px;
  button {
    padding: 4px;
  }
  svg {
    stroke: ${({ theme }) => theme.text.gray2};
  }
`;

const OtherChallengeBook = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 2px;
  button {
    height: 50px;
    img {
      margin: 0;
      border-radius: 3px;
    }
  }

  @media ${device.tablet} {
    h4 {
      font-size: 16px;
    }
  }
`;