import { IChallenge, IChallengeBook } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { FormEvent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { CHALLENGE } from 'constants/index';
import BookThumbnail from 'components/atoms/BookThumbnail';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';
import RefInput from 'components/atoms/input/RefInput';
import styled from 'styled-components';

interface Props {
  challenge: IChallenge;
  currChallengeBook: IChallengeBook;
  onModalClose: () => void;
  currentPageNum: number;
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChallengeEditModal({
  challenge,
  currChallengeBook,
  onModalClose,
  currentPageNum,
  setCurrentPageNum,
}: Props) {
  const { books } = challenge;
  const userData = useRecoilValue(currentUserState);

  const currPageRef = useRef<HTMLInputElement>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentPage = +currPageRef.current.value;

    if (currentPage > currChallengeBook.wholePage) {
      return alert('현재 페이지가 전체 페이지보다 많습니다!');
    }

    if (isNaN(currentPage)) {
      return alert('숫자를 입력해주세요.');
    }

    const editedPageBooks = books.map((book) =>
      book.title === currChallengeBook.title ? { ...book, currentPage } : book
    );

    const editedChallengeDoc: IChallenge = {
      ...challenge,
      createdAt: Date.now(),
      books: editedPageBooks,
    };

    await setDoc(doc(dbService, CHALLENGE, userData.uid), editedChallengeDoc);
    onModalClose();
    setCurrentPageNum(currentPage);

    if (currentPage === currChallengeBook.wholePage) {
      alert('축하합니다! 챌린지 하나를 완주하셨군요!👏👏👏');
    } else {
      alert('현재 페이지가 수정되었어요!');
    }
  };

  const { title, thumbnail, authors, publisher } = currChallengeBook;

  return (
    <Modal title='나의 챌린지 진도 수정' onToggleClick={onModalClose}>
      <Form onSubmit={onSubmit}>
        <BookBox>
          <BookThumbnail title={title} thumbnail={thumbnail} />
          <BookTextInfo>
            <h4>{title}</h4>
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          </BookTextInfo>
        </BookBox>

        <PageBox>
          <label>현재까지 읽은 페이지: {currentPageNum}p</label>
          <RefInput
            ref={currPageRef}
            name='currentPage'
            placeholder='현재 페이지를 수정해주세요.'
          />
        </PageBox>

        <SquareBtn type='submit' name='현재 페이지 수정하기' />
      </Form>
    </Modal>
  );
}

const Form = styled.form`
  padding: 2px 4px;
  > h3 {
    margin-bottom: 2px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.purple};
    flex: 1;
  }
`;

const BookBox = styled.div`
  height: 88px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 10px 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const BookTextInfo = styled.div`
  > h4 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 16px;
  }
  > span {
    line-height: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.container.blue3};
    .percent {
      margin-left: 5px;
      font-size: 13px;
      color: ${({ theme }) => theme.container.blue3};
    }
  }
`;

const PageBox = styled.div`
  gap: 10px;
  margin: 15px 0;
  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;
