import { IChallenge } from 'data/challengeAtom';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/buttons/SquareBtn';
import Input from 'components/atoms/inputs/Input';
import styled from 'styled-components';
import Tag from 'components/atoms/Tag';

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

    await setDoc(doc(dbService, 'Challenge', `${userData.uid}`), challengeDoc);
    onModalClose();
    alert('현재 페이지가 수정되었어요!');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageNum(+event.target.value);
  };

  const { title, thumbnail, authors, publisher } = books[0];

  return (
    <Modal title='챌린지 진도 수정하기' onToggleClick={onModalClose}>
      <Form onSubmit={onSubmit}>
        <BookBox>
          <BookThumbnailImg title={title} thumbnail={thumbnail} />
          <div>
            <h4>{title}</h4>
            <div>
              <span>
                {authors[0]}
                {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
              </span>
              {publisher && <span>{publisher}</span>}
            </div>
          </div>
        </BookBox>

        <Tag name={`전체 페이지 수: ${wholePage}p`} />

        <PageBox>
          <label>현재 페이지 수</label>
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
  height: 100px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 10px 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    h4 {
      font-size: 16px;
      line-height: 1.4;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
      span {
        font-size: 14px;
        line-height: 1.3;
        color: ${({ theme }) => theme.text.gray3};
      }
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
