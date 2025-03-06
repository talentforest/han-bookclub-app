import { ChangeEvent, FormEvent, useState } from 'react';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { IChallenge, bookDescState, challengeState } from 'data/bookAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';

import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';

interface Props {
  onModalClose: () => void;
}

export default function ChallengeModalForm({ onModalClose }: Props) {
  const userChallenge = useRecoilValue(challengeState);
  const bookDesc = useRecoilValue(bookDescState);
  const { uid } = useRecoilValue(currAuthUserAtom);
  const [pageNums, setPageNums] = useState({
    wholePage: 0,
    currentPage: 0,
  });

  const findMyChallengeBooks = userChallenge;

  const { title, thumbnail, authors, publisher } = bookDesc;

  const { anonymous, alertAskJoinMember } = useAlertAskJoin('write');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (
      Number.isNaN(pageNums.currentPage) ||
      Number.isNaN(pageNums.wholePage)
    ) {
      return alert('숫자를 입력해주세요.');
    }

    if (pageNums.wholePage === 0) {
      return alert(
        '전체 페이지 수가 0이 될 수 없습니다. 다시 한번 확인해주세요!',
      );
    }

    if (pageNums.currentPage > pageNums.wholePage) {
      return alert(
        '현재 페이지수가 전체 페이지 수보다 많을 수 없습니다. 다시 한번 확인해주세요!',
      );
    }

    const alreayExistBook = findMyChallengeBooks?.books?.find(
      book => book.title === bookDesc.title,
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
          creatorId: uid,
          books: [{ ...bookDesc, ...pageNums }],
        };

    await setDoc(doc(dbService, CHALLENGE, uid), challengeDoc);

    onModalClose();

    alert(
      '2024년 개인별 챌린지 책이 추가되었습니다! 챌린지 달성을 응원할게요!',
    );
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'wholePage' | 'currentPage',
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
    <form onSubmit={onSubmit}>
      <h3>내가 선택한 챌린지</h3>
      <div>
        <BookThumbnail title={title} thumbnail={thumbnail} />
        <div>
          <h4>{title}</h4>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="wholePage">전체 페이지 수</label>
          <Input
            name="wholePage"
            value={`${pageNums.wholePage}`}
            placeholder="전체 페이지 수를 적어주세요."
            onChange={event => onChange(event, 'wholePage')}
          />
        </div>

        <div>
          <label htmlFor="currentPage">현재 페이지 수</label>
          <Input
            name="currentPage"
            value={`${pageNums.currentPage}`}
            placeholder="현재 페이지 수를 적어주세요."
            onChange={event => onChange(event, 'currentPage')}
          />
        </div>
      </div>

      <SquareBtn type="submit" name="챌린지 추가하기" />
    </form>
  );
}
