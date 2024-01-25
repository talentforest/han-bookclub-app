import { IChallenge } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CHALLENGE } from 'constants/index';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import styled from 'styled-components';
import { getPercentage } from 'util/index';

interface Props {
  challenge: IChallenge;
  onModalClose: () => void;
}

export default function ChallengeEditModal({ challenge, onModalClose }: Props) {
  const { wholePage, currentPage, books } = challenge;
  const userData = useRecoilValue(currentUserState);
  const [currentPageNum, setCurrentPageNum] = useState(currentPage);

  const challengeDoc: IChallenge = {
    ...challenge,
    createdAt: Date.now(),
    currentPage: currentPageNum,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await setDoc(doc(dbService, CHALLENGE, `${userData.uid}`), challengeDoc);
    onModalClose();
    alert('현재 페이지가 수정되었어요!');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageNum(+event.target.value);
  };

  const { title, thumbnail, authors, publisher } = books[0];

  return (
    <Modal title='나의 챌린지 진도 수정' onToggleClick={onModalClose}>
      <Form onSubmit={onSubmit}>
        <BookBox>
          <BookThumbnailImg title={title} thumbnail={thumbnail} />
          <BookTextInfo>
            <h4>{title}</h4>
            <AuthorPublisher>
              <span>
                {authors[0]}
                {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
              </span>
              <span> ・ {publisher}</span>
            </AuthorPublisher>
            <span>
              {currentPageNum}p / {wholePage}p
              <span className='percent'>
                ({getPercentage(currentPage, wholePage).toFixed(0)}%)
              </span>
            </span>
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

const AuthorPublisher = styled.div`
  margin-top: 2px;
  display: flex;
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
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
