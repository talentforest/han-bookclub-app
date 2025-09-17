import { ChangeEvent, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { SENTENCES2024 } from '@/appConstants';

import { useAddDoc, useHandleModal, useSendPushNotification } from '@/hooks';

import { formatDate } from '@/utils';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface SentenceAddModalProps {
  book: { title: string; thumbnail: string };
}

export default function SentenceAddModal({ book }: SentenceAddModalProps) {
  const [sentence, setSentence] = useState('');
  const [page, setPage] = useState('');

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { sendPostPushNotification, isPending } = useSendPushNotification();

  const { title, thumbnail } = book;

  const docData = {
    title,
    thumbnail,
    creatorId: uid,
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    text: sentence,
    page: +page,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText: setSentence,
    collName: SENTENCES2024,
    docData,
  });

  const { hideModal } = useHandleModal();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sentence === '') {
      return window.alert('문구가 작성되지 않았습니다.');
    }
    if (page === '') {
      return window.alert('페이지가 작성되지 않았습니다.');
    }

    onAddDocSubmit(event);
    sendPostPushNotification('공유하고 싶은 문구');
    hideModal();
    alert(
      '문구가 추가되었습니다. 공유해주신 좋은 문구를 멤버들이 볼 수 있게 되었어요!',
    );
  };

  const onPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(event.target.value);
  };

  return (
    <Modal title="공유하고 싶은 문구 등록하기">
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="공유하고 싶은 문구를 작성해주세요."
          onChange={onChange}
          value={sentence}
        />

        <Input
          label="문구가 적힌 페이지"
          id="페이지"
          name="sentence-page"
          placeholder="페이지를 작성해주세요."
          value={`${page}`}
          onChange={onPageChange}
        />

        <SquareBtn type="submit" name="등록하기" disabled={isPending} />
      </form>
    </Modal>
  );
}
