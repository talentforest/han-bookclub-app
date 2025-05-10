import { useEffect, useRef, useState } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { ISearchedBook } from 'data/bookAtom';
import { ChallengeRereading } from 'data/challengeAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { dbService } from 'fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { formatDate, thisYear } from 'utils';

import Modal from 'components/common/Modal';
import Tag from 'components/common/Tag';
import BookAuthorPublisher from 'components/common/book/BookAuthorPublisher';
import BookThumbnail from 'components/common/book/BookThumbnail';
import SquareBtn from 'components/common/button/SquareBtn';

interface ChallengeRereadingModalProps {
  rereadingBook: ISearchedBook;
  toggleOpen: () => void;
}

export default function ChallengeRereadingModal({
  rereadingBook,
  toggleOpen,
}: ChallengeRereadingModalProps) {
  const { title: bookTitle, thumbnail, authors, publisher } = rereadingBook;

  const ref = useRef<HTMLTextAreaElement>();

  const { uid } = useRecoilValue(currAuthUserAtom);

  const [userChallenge, setUserChallenge] = useState<ChallengeRereading | null>(
    null,
  );

  useEffect(() => {
    getDocument(CHALLENGE, `${thisYear}-${uid}`, setUserChallenge);
  }, [uid]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ref.current.value === '')
      return window.alert('소감이 작성되지 않았습니다.');

    const existChallengeDoc = userChallenge?.creatorId;
    const existRereadingBook = userChallenge[bookTitle];
    const docRef = doc(dbService, CHALLENGE, `${thisYear}-${uid}`);

    const newImpression = {
      text: ref.current.value,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    const newRereadingBook = {
      [bookTitle]: {
        book: { title: bookTitle, thumbnail, authors, publisher },
        counts: 1,
        impressionList: [{ id: 1, ...newImpression }],
      },
    };

    if (existChallengeDoc) {
      await updateDoc(
        docRef,
        existRereadingBook
          ? {
              [bookTitle]: {
                ...existRereadingBook,
                counts: existRereadingBook.counts + 1,
                impressionList: [
                  ...existRereadingBook.impressionList,
                  {
                    id: existRereadingBook.impressionList.length + 1,
                    ...newImpression,
                  },
                ],
              },
            }
          : newRereadingBook,
      );
    } else {
      await setDoc(docRef, { creatorId: uid, ...newRereadingBook });
    }

    toggleOpen();
    alert('소감이 작성 완료되었습니다. 챌린지를 추가 달성했습니다!❣️');
  };

  return (
    <Modal title="재독 챌린지" onToggleClick={toggleOpen}>
      <div className="flex items-center gap-3">
        <BookThumbnail
          title={bookTitle}
          thumbnail={thumbnail}
          className="w-8"
        />
        <div className="">
          <h2 className="mb-0.5 line-clamp-1 w-full">{bookTitle}</h2>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <Tag
          text="재독한 멤버 2명"
          color="lightBlue"
          shape="rounded"
          className="!py-1 text-xs !text-blue-600"
        />
        <Tag
          text="재독된 횟수 총 3번"
          color="lightGreen"
          shape="rounded"
          className="!py-1 text-xs !text-green-600"
        />
      </div>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
        <textarea
          ref={ref}
          placeholder="이 책을 재독한 소감을 작성해주세요."
          className="min-h-32 resize-none rounded-xl border p-3 outline-none"
        />
        <SquareBtn
          name="챌린지완료"
          color="darkBlue"
          type="submit"
          className="self-end"
        />
      </form>
    </Modal>
  );
}
