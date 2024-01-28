import { IChallenge, IChallengeBook } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { CHALLENGE } from 'constants/index';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import styled from 'styled-components';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedPageBooks = books.map((book) =>
      book.title === currChallengeBook.title
        ? { ...book, currentPage: currentPageNum }
        : book
    );

    const editedChallengeDoc: IChallenge = {
      ...challenge,
      createdAt: Date.now(),
      books: editedPageBooks,
    };

    await setDoc(doc(dbService, CHALLENGE, userData.uid), editedChallengeDoc);
    onModalClose();
    alert('현재 페이지가 수정되었어요!');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageNum(+event.target.value);
  };

  const { title, thumbnail, authors, publisher } = currChallengeBook;

  return (
    <Modal title='나의 챌린지 진도 수정' onToggleClick={onModalClose}>
      <Form onSubmit={onSubmit}>
        <BookBox>
          <BookThumbnailImg title={title} thumbnail={thumbnail} />
          <BookTextInfo>
            <h4>{title}</h4>
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          </BookTextInfo>
        </BookBox>

        <PageBox>
          <label>현재까지 읽은 페이지</label>
          <Input
            name='currentPage'
            value={`${currentPageNum}`}
            placeholder='현재 페이지 수를 적어주세요.'
            onChange={onChange}
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
  input {
    flex: 1;
  }
`;
