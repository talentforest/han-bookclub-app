import { bookDescState } from 'data/bookAtom';
import { IChallenge } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CHALLENGE } from 'constants/index';
import styled from 'styled-components';
import BookThumbnailImg from '../../atoms/BookThumbnailImg';
import Input from '../../atoms/input/Input';
import SquareBtn from '../../atoms/button/SquareBtn';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface Props {
  onModalClose: () => void;
}

export default function ChallengeModalForm({ onModalClose }: Props) {
  const bookDesc = useRecoilValue(bookDescState);
  const userData = useRecoilValue(currentUserState);
  const [pageNums, setPageNums] = useState({
    wholePage: 0,
    currentPage: 0,
  });

  const { title, thumbnail, authors, publisher } = bookDesc;

  const challengeDoc: IChallenge = {
    createdAt: Date.now(),
    creatorId: userData.uid,
    books: [bookDesc],
    ...pageNums,
  };

  const { anonymous, alertAskJoinMember } = useAlertAskJoin('write');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (anonymous) return alertAskJoinMember();

    await setDoc(doc(dbService, CHALLENGE, `${userData.uid}`), challengeDoc);

    onModalClose();

    alert('2024년 챌린지가 추가되었습니다! 챌린지 달성을 응원할게요!');
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'wholePage' | 'currentPage'
  ) => {
    const { value } = event.target;

    const changedData =
      type === 'wholePage'
        ? {
            wholePage: +value,
          }
        : { currentPage: +value };

    setPageNums({ ...pageNums, ...changedData });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>내가 선택한 챌린지</h3>
      <BookBox>
        <BookThumbnailImg title={title} thumbnail={thumbnail} />
        <div>
          <h4>{title}</h4>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        </div>
      </BookBox>

      <PageBoxes>
        <div>
          <label>전체 페이지 수</label>
          <Input
            name='wholePage'
            value={`${pageNums.wholePage}`}
            placeholder='전체 페이지 수를 적어주세요.'
            onChange={(event) => onChange(event, 'wholePage')}
          />
        </div>

        <div>
          <label>현재 페이지 수</label>
          <Input
            name='currentPage'
            value={`${pageNums.currentPage}`}
            placeholder='현재 페이지 수를 적어주세요.'
            onChange={(event) => onChange(event, 'currentPage')}
          />
        </div>
      </PageBoxes>

      <SquareBtn type='submit' name='챌린지 추가하기' />
    </Form>
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

const PageBoxes = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
  > div {
    width: 100%;
    label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      color: ${({ theme }) => theme.text.gray3};
    }
  }
`;
