import { FormEvent, useRef } from 'react';

import useSendPushNotification from 'hooks/useSendPushNotification';

import { IChallenge, IChallengeBook } from 'data/bookAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { formatDate } from 'utils';

import Modal from 'components/common/Modal';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import SquareBtn from 'components/common/button/SquareBtn';
import RefInput from 'components/common/input/RefInput';

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
  const { uid } = useRecoilValue(currAuthUserAtom);

  const currPageRef = useRef<HTMLInputElement>();

  const { sendCompleteChallengePushNotification, isPending } =
    useSendPushNotification();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentPage = +currPageRef.current.value;

    if (currentPage > currChallengeBook.wholePage) {
      return alert('현재 페이지가 전체 페이지보다 많습니다!');
    }

    if (Number.isNaN(currentPage)) {
      return alert('숫자를 입력해주세요.');
    }

    const editedPageBooks = books.map(book =>
      book.title === currChallengeBook.title ? { ...book, currentPage } : book,
    );

    const editedChallengeDoc: IChallenge = {
      ...challenge,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      books: editedPageBooks,
    };

    await setDoc(doc(dbService, CHALLENGE, uid), editedChallengeDoc);
    onModalClose();
    setCurrentPageNum(currentPage);

    if (currentPage === currChallengeBook.wholePage) {
      alert('축하합니다! 챌린지 하나를 완주하셨군요!👏👏👏');
      sendCompleteChallengePushNotification({
        bookTitle: currChallengeBook.title,
      });
    } else {
      alert('현재 페이지가 수정되었어요!');
    }
  };

  const { title, thumbnail, authors, publisher } = currChallengeBook;

  return (
    <Modal title="나의 챌린지 진도 수정" onToggleClick={onModalClose}>
      <form onSubmit={onSubmit}>
        <div>
          <BookThumbnail title={title} thumbnail={thumbnail} />
          <div>
            <h4>{title}</h4>
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          </div>
        </div>

        <div>
          <label>현재까지 읽은 페이지: {currentPageNum}p</label>
          <RefInput
            ref={currPageRef}
            name="currentPage"
            placeholder="현재 페이지를 수정해주세요."
          />
        </div>

        <SquareBtn
          type="submit"
          name="현재 페이지 수정하기"
          disabled={isPending}
        />
      </form>
    </Modal>
  );
}
