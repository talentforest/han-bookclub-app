import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import QuillEditor from 'components/atoms/QuillEditor';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';

interface Props {
  toggleModal: () => void;
  title: '정리 기록 작성하기' | '발제문 작성하기';
}

const PostAddModal = ({ toggleModal, title }: Props) => {
  const [text, setText] = useState('');

  const thisMonthClub = useRecoilValue(thisMonthBookClubState);
  const userData = useRecoilValue(currentUserState);

  const {
    id,
    book: { thumbnail, title: bookTitle },
  } = thisMonthClub;

  const collName =
    title === '발제문 작성하기'
      ? getFbRoute(id).SUBJECTS
      : getFbRoute(id).HOST_REVIEW;

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData?.uid,
    title: bookTitle,
    thumbnail,
  };

  const { onAddDocSubmit } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onAddDocSubmit(event);
    toggleModal();
  };

  return (
    <Modal onToggleClick={toggleModal} title={title}>
      <form onSubmit={handleSubmit}>
        <QuillEditor
          placeholder={`${
            title === '발제문 작성하기' ? '발제문' : '모임 기록'
          }을 작성해주세요`}
          text={text}
          setText={setText}
        />

        <SquareBtn name='작성 완료' type='submit' />
      </form>
    </Modal>
  );
};

export default PostAddModal;
