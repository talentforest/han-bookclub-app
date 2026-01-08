import { FormEvent, useRef } from 'react';

import { dbService } from '@/fbase';
import { doc, setDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { CHALLENGE } from '@/appConstants';

import { useHandleModal, useSendPushNotification } from '@/hooks';

import { formatDate } from '@/utils';

import { CompleteReadingChallenge } from '@/types';

import Modal from '@/components/common/Modal';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface ChallengeEditModalProps {
  challenge: CompleteReadingChallenge;
  currChallengeBook: any;
  currentPageNum: number;
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChallengeEditModal({
  challenge,
  currChallengeBook,
  currentPageNum,
  setCurrentPageNum,
}: ChallengeEditModalProps) {
  const { books } = challenge;
  const {
    data: { uid, displayName },
  } = useRecoilValue(currAuthUserAtom);

  const currPageRef = useRef<HTMLInputElement>();

  const { sendPushNotificationToAllUser, isPending } =
    useSendPushNotification();

  const { hideModal } = useHandleModal();

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

    const editedChallengeDoc: CompleteReadingChallenge = {
      ...challenge,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      books: editedPageBooks,
    };

    await setDoc(doc(dbService, CHALLENGE, uid), editedChallengeDoc);
    hideModal();
    setCurrentPageNum(currentPage);

    if (currentPage === currChallengeBook.wholePage) {
      alert('축하합니다! 챌린지 하나를 완주하셨군요!👏👏👏');

      const title = `🔥챌린지 완주 성공`;
      const body = `${displayName}님이 📚${currChallengeBook.title} 챌린지를 완주했습니다! 같이 힘내서 끝까지 완주해봐요!`;
      const subPath = '/challenge';

      sendPushNotificationToAllUser({ title, body, subPath });
    } else {
      alert('현재 페이지가 수정되었어요!');
    }
  };

  const { title, thumbnail, authors, publisher } = currChallengeBook;

  return (
    <Modal title="나의 챌린지 진도 수정">
      <form onSubmit={onSubmit}>
        <div>
          <BookThumbnail title={title} thumbnail={thumbnail} />
          <div>
            <h4>{title}</h4>
            <BookAuthorPublisher authors={authors} publisher={publisher} />
          </div>
        </div>

        <Input
          ref={currPageRef}
          label={`현재까지 읽은 페이지: ${currentPageNum}p`}
          name="currentPage"
          placeholder="현재 페이지를 수정해주세요."
        />

        <SquareBtn
          type="submit"
          name="현재 페이지 수정하기"
          disabled={isPending}
        />
      </form>
    </Modal>
  );
}
