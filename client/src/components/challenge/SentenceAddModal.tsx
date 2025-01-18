import { ChangeEvent, useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useSendPushNotification from 'hooks/useSendPushNotification';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { SENTENCES2024 } from 'appConstants';

import Modal from 'components/common/Modal';
import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';

interface Props {
  onToggleClick: () => void;
  book: { title: string; thumbnail: string };
}

export default function SentenceAddModal({ onToggleClick, book }: Props) {
  const [sentence, setSentence] = useState('');
  const [page, setPage] = useState('');

  const currentUser = useRecoilValue(currentUserState);

  const { sendPostNotification } = useSendPushNotification();

  const { title, thumbnail } = book;

  const docData = {
    title,
    thumbnail,
    creatorId: currentUser.uid,
    createdAt: Date.now(),
    text: sentence,
    page: +page,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText: setSentence,
    collName: SENTENCES2024,
    docData,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sentence === '') {
      return window.alert('문구가 작성되지 않았습니다.');
    }
    if (page === '') {
      return window.alert('페이지가 작성되지 않았습니다.');
    }

    onAddDocSubmit(event);
    sendPostNotification('공유하고 싶은 문구');
    onToggleClick();
    alert(
      '문구가 추가되었습니다. 공유해주신 좋은 문구를 멤버들이 볼 수 있게 되었어요!',
    );
  };

  const onPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(event.target.value);
  };

  return (
    <Modal title="공유하고 싶은 문구 등록하기" onToggleClick={onToggleClick}>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="공유하고 싶은 문구를 작성해주세요."
          onChange={onChange}
          value={sentence}
        />

        <div>
          <label htmlFor="페이지">문구가 적힌 페이지</label>
          <Input
            id="페이지"
            name="sentence-page"
            placeholder="페이지를 작성해주세요."
            value={`${page}`}
            onChange={onPageChange}
          />
        </div>

        <SquareBtn type="submit" name="등록하기" />
      </form>
    </Modal>
  );
}
