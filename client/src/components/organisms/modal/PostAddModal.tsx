import { FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { PostType } from 'components/molecules/PostHandleBtns';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import QuillEditor from 'components/atoms/QuillEditor';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import useSendPushNotification from 'hooks/useSendPushNotification';
import useHandlePenalty from 'hooks/useHandlePenalty';

interface Props {
  toggleModal: () => void;
  postType: PostType;
}

const PostAddModal = ({ toggleModal, postType }: Props) => {
  const [text, setText] = useState('');

  const thisMonthClub = useRecoilValue(thisMonthBookClubState);
  const userData = useRecoilValue(currentUserState);

  const { sendPostNotification } = useSendPushNotification();

  const {
    id,
    book: { thumbnail, title: bookTitle },
  } = thisMonthClub;

  const collName =
    postType === '발제문'
      ? getFbRoute(id).SUBJECTS
      : getFbRoute(id).HOST_REVIEW;

  const docData = {
    text,
    createdAt: new Date(2024, 5, 30).getTime(),
    creatorId: userData?.uid,
    title: bookTitle,
    thumbnail,
  };

  const { isOverdueSubject, isOverdueEndOfThisMonth, updatePenaltyMonth } =
    useHandlePenalty({
      createdAt: docData.createdAt,
    });

  const { onAddDocSubmit } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const isOverdue =
    postType === '발제문' ? isOverdueSubject : isOverdueEndOfThisMonth;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    onAddDocSubmit(event);
    if (isOverdue) {
      updatePenaltyMonth(postType);
    }

    if (docData.text !== '') {
      sendPostNotification(postType);
    }
    toggleModal();
  };

  return (
    <Modal onToggleClick={toggleModal} title={`${postType} 작성하기`}>
      <form onSubmit={handleSubmit}>
        <QuillEditor
          placeholder={`${postType}을 작성해주세요`}
          text={text}
          setText={setText}
        />

        <SquareBtn name='작성 완료' type='submit' />
      </form>
    </Modal>
  );
};

export default PostAddModal;
