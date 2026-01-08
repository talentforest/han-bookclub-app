import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { SENTENCES2024 } from '@/appConstants';

import { useAddDoc, useHandleModal, useSendPushNotification } from '@/hooks';

import { BaseBookData, ChallengeSentence } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface SentenceAddModalProps {
  book: BaseBookData;
}

export default function SentenceAddModal({ book }: SentenceAddModalProps) {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { sendPostPushNotification, isPending } = useSendPushNotification();

  const initialDocData = {
    text: '',
    creatorId: uid,
    createdAt: '',
    clubBook: book,
    page: 0,
  };

  const { onAddDocSubmit, onDataChange, newDocData } = useAddDoc<
    Partial<ChallengeSentence>
  >({
    collName: SENTENCES2024,
    initialDocData,
  });

  const { hideModal } = useHandleModal();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newDocData.text === '') {
      return window.alert('문구가 작성되지 않았습니다.');
    }
    if (newDocData.page === 0) {
      return window.alert('페이지가 작성되지 않았습니다.');
    }

    onAddDocSubmit(event);
    onDataChange({ text: '' });
    sendPostPushNotification('발제문');
    hideModal();
    alert(
      '문구가 추가되었습니다. 공유해주신 좋은 문구를 멤버들이 볼 수 있게 되었어요!',
    );
  };

  return (
    <Modal title="공유하고 싶은 문구 등록하기">
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="공유하고 싶은 문구를 작성해주세요."
          onChange={e => onDataChange({ text: e.target.value })}
          value={newDocData.text}
        />

        <Input
          label="문구가 적힌 페이지"
          id="페이지"
          name="sentence-page"
          placeholder="페이지를 작성해주세요."
          value={`${newDocData.page}`}
          onChange={e => onDataChange({ page: +e.target.value })}
        />

        <SquareBtn type="submit" name="등록하기" disabled={isPending} />
      </form>
    </Modal>
  );
}
