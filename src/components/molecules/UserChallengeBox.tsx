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
import BookThumbnail from '../atoms/BookThumbnailImg';
import UserNameBox from 'components/atoms/UserNameBox';
import ChallengeEditModal from 'components/organisms/modal/ChallengeEditModal';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';
import ChallengePagePosition from './ChallengePagePosition';

interface Props {
  challenge: IChallenge;
}

export default function UserChallengeBox({ challenge }: Props) {
  const { creatorId, books, id } = challenge;

  const currentUser = useRecoilValue(currentUserState);
  const [openModal, setOpenModal] = useState(false);
  const [currChallengeBook, setCurrChallengeBook] = useState(books[0]);
  const [currentPageNum, setCurrentPageNum] = useState(
    currChallengeBook.currentPage
  );

  const { pathname } = useLocation();

  const { title, thumbnail, authors, publisher, wholePage } = currChallengeBook;

  const onModalClick = () => setOpenModal((prev) => !prev);

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
              <button type='button' onClick={onDeleteClick}>
                <FiTrash2 fontSize={14} />
              </button>
            </BtnBox>
          )}

          <BookThumbnail title={title} thumbnail={thumbnail} />

          <div className='info'>
            <UserNameBox creatorId={creatorId} fontSize={15} />
            <div>
              <h3>{title ? cutLetter(title, 40) : '이벤트'}</h3>
              <BookAuthorPublisher authors={authors} publisher={publisher} />
            </div>
          </div>
        </BookBox>

        <ChallengePagePosition
          currentPage={currentPageNum}
          wholePage={wholePage}
          editable={currentUser.uid === creatorId}
          onEditClick={onModalClick}
        />
      </ChallengeBook>

      {pathname === '/challenge' && otherChallengeBooks.length !== 0 && (
        <OtherChallengeBook>
          <h4>
            <UserNameBox creatorId={creatorId} fontSize={15} />의 추가 챌린지북
          </h4>
          <div>
            {otherChallengeBooks.map((book) => (
              <button
                key={book.title}
                type='button'
                onClick={() => onChangeCurrentBook(book)}
              >
                <BookThumbnail title={book.title} thumbnail={book.thumbnail} />
              </button>
            ))}
          </div>
        </OtherChallengeBook>
      )}

      {openModal && (
        <ChallengeEditModal
          onModalClose={onModalClick}
          challenge={challenge}
          currChallengeBook={currChallengeBook}
          currentPageNum={currentPageNum}
          setCurrentPageNum={setCurrentPageNum}
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
  margin-top: 25px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookBox = styled.div`
  flex: 1;
  display: flex;
  > img {
    height: 100px;
    margin-top: -24px;
  }
  > .info {
    min-height: 75px;
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
        line-height: 1.4;
      }
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  position: absolute;
  right: 8px;
  top: 4px;
  gap: 10px;
  button {
    padding: 4px;
  }
  svg {
    font-size: 14px;
    stroke: ${({ theme }) => theme.text.gray2};
  }
`;

const OtherChallengeBook = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 10px 0 20px;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  h4 {
    color: ${({ theme }) => theme.text.gray2};
    display: flex;
    font-size: 15px;
    a {
      span {
        color: ${({ theme }) => theme.text.gray2};
      }
    }
  }
  div {
    width: 100%;
    display: flex;
    gap: 10px;
    height: 45px;
    margin: 3px 0;
    justify-content: flex-end;
    img {
      margin: 0;
      border-radius: 4px;
    }
  }
  @media ${device.tablet} {
    h4 {
      font-size: 16px;
    }
  }
`;
