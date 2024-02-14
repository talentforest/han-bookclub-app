import { bookDescState, challengeState } from 'data/bookAtom';
import { IChallenge } from 'data/bookAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { ChangeEvent, FormEvent, useState } from 'react';
import { CHALLENGE } from 'constants/index';
import styled from 'styled-components';
import BookThumbnail from '../atoms/BookThumbnail';
import Input from '../atoms/input/Input';
import SquareBtn from '../atoms/button/SquareBtn';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface Props {
  onModalClose: () => void;
}

export default function ChallengeModalForm({ onModalClose }: Props) {
  const userChallenges = useRecoilValue(challengeState);
  const bookDesc = useRecoilValue(bookDescState);
  const userData = useRecoilValue(currentUserState);
  const [pageNums, setPageNums] = useState({
    wholePage: 0,
    currentPage: 0,
  });

  const findMyChallengeBooks = userChallenges.find(
    (challenge) => challenge.id === userData.uid
  );

  const { title, thumbnail, authors, publisher } = bookDesc;

  const { anonymous, alertAskJoinMember } = useAlertAskJoin('write');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (isNaN(pageNums.currentPage) || isNaN(pageNums.wholePage)) {
      return alert('숫자를 입력해주세요.');
    }

    if (pageNums.wholePage === 0) {
      return alert(
        '전체 페이지 수가 0이 될 수 없습니다. 다시 한번 확인해주세요!'
      );
    }

    if (pageNums.currentPage > pageNums.wholePage) {
      return alert(
        '현재 페이지수가 전체 페이지 수보다 많을 수 없습니다. 다시 한번 확인해주세요!'
      );
    }

    const alreayExistBook = findMyChallengeBooks?.books?.find(
      (book) => book.title === bookDesc.title
    );

    if (alreayExistBook) {
      return alert('이미 똑같은 책이 존재하고 있어요.');
    }

    const challengeDoc: IChallenge = findMyChallengeBooks
      ? {
          ...findMyChallengeBooks,
          books: [...findMyChallengeBooks.books, { ...bookDesc, ...pageNums }],
        }
      : {
          createdAt: Date.now(),
          creatorId: userData.uid,
          books: [{ ...bookDesc, ...pageNums }],
        };

    await setDoc(doc(dbService, CHALLENGE, userData.uid), challengeDoc);

    onModalClose();

    alert(
      '2024년 개인별 챌린지 책이 추가되었습니다! 챌린지 달성을 응원할게요!'
    );
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
        <BookThumbnail title={title} thumbnail={thumbnail} />
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
  height: 80px;
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
