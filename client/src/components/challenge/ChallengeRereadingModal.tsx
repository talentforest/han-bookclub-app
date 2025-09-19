import { useEffect, useRef, useState } from 'react';

import { dbService } from '@/fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { CHALLENGE } from '@/appConstants';

import {
  useAlertAskJoin,
  useHandleModal,
  useSendPushNotification,
} from '@/hooks';

import { formatDate, thisYear } from '@/utils';

import { BaseBookData, RereadingChallenge } from '@/types';

import Modal from '@/components/common/Modal';
import Tag from '@/components/common/Tag';
import BookAuthorPublisher from '@/components/common/book/BookAuthorPublisher';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import UserName from '@/components/common/user/UserName';

interface ChallengeRereadingModalProps {
  selectedBook: Omit<BaseBookData, 'url'>;
  readers: number;
  counts: number;
  reason: string;
  recommendedUser: string;
}

export default function ChallengeRereadingModal({
  selectedBook,
  readers,
  counts,
  reason,
  recommendedUser,
}: ChallengeRereadingModalProps) {
  const ref = useRef<HTMLTextAreaElement>();

  const { uid, displayName } = useRecoilValue(currAuthUserAtom);

  const [userChallenge, setUserChallenge] = useState<RereadingChallenge | null>(
    null,
  );

  const { anonymous } = useAlertAskJoin('register');

  useEffect(() => {
    getDocument(CHALLENGE, `${thisYear}-${uid}`, setUserChallenge);
  }, [uid]);

  const { hideModal } = useHandleModal();

  const { sendPushNotificationToAllUser } = useSendPushNotification();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ref.current.value === '')
      return window.alert('소감이 작성되지 않았습니다.');

    const existChallengeDoc = userChallenge?.creatorId;
    const existRereadingBook = userChallenge[title];
    const docRef = doc(dbService, CHALLENGE, `${thisYear}-${uid}`);

    const newImpression = {
      text: ref.current.value,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      creatorId: uid,
    };

    const newRereadingBook = {
      [title]: {
        book: { title, thumbnail, authors, publisher },
        counts: 1,
        impressionList: [{ id: 1, ...newImpression }],
      },
    };

    if (existChallengeDoc) {
      await updateDoc(
        docRef,
        existRereadingBook
          ? {
              [title]: {
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

    hideModal();
    alert('소감이 작성 완료되었습니다. 챌린지를 추가 달성했습니다!❣️');
    sendPushNotificationToAllUser({
      title: '다시 읽기 챌린지를 달성한 멤버가 있어요!',
      body: `${displayName}님이 ${title} 책을 다시 읽었어요!`,
      subPath: '/challenge',
    });
  };

  const { title, thumbnail, authors, publisher } = selectedBook;

  return (
    <Modal title="재독 챌린지">
      <div className="flex items-center gap-3">
        <BookThumbnail title={title} thumbnail={thumbnail} className="w-8" />
        <div className="">
          <h2 className="mb-0.5 line-clamp-1 w-full">{title}</h2>
          <BookAuthorPublisher authors={authors} publisher={publisher} />
        </div>
      </div>
      {recommendedUser && (
        <div className="mt-3 inline">
          추천한 멤버: <UserName userId={recommendedUser} tag />
        </div>
      )}
      {reason && (
        <p className="mt-2 border-l-4 border-gray3 pl-2 text-sm">{reason}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag
          text={`🙋🏻 ${readers}명의 멤버가 재독`}
          color="lightBlue"
          className="!py-1.5 text-sm !text-blue-600"
        />
        <Tag
          text={`👀 총 ${counts}번 재독`}
          color="yellow"
          className="!py-1.5 text-sm !text-green-600"
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
          disabled={anonymous}
        />
        {anonymous && (
          <p className="ml-auto text-sm text-red-500">
            익명의 방문자는 참여할 수 없습니다.
          </p>
        )}
      </form>
    </Modal>
  );
}
