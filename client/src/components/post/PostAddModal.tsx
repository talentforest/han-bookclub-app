import { FormEvent, useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useSendPushNotification from 'hooks/useSendPushNotification';

import { clubByMonthSelector } from 'data/clubAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { HOST_REVIEW, SUBJECTS } from 'appConstants';
import { formatDate, getFbRouteOfPost, thisYearMonthId } from 'utils';

import Modal from 'components/common/Modal';
import SquareBtn from 'components/common/button/SquareBtn';
import QuillEditor from 'components/common/editor/QuillEditor';
import { PostType } from 'components/post/PostHandleBtns';

interface Props {
  toggleModal: () => void;
  postType: PostType;
}

const PostAddModal = ({ toggleModal, postType }: Props) => {
  const [text, setText] = useState('');

  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { sendPostNotification, isPending } = useSendPushNotification();

  const {
    id,
    book: { thumbnail, title: bookTitle },
  } = thisMonthClub;

  const collName =
    postType === '발제문'
      ? getFbRouteOfPost(id, SUBJECTS)
      : getFbRouteOfPost(id, HOST_REVIEW);

  const docData = {
    text,
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
    title: bookTitle,
    thumbnail,
  };

  const { onAddDocSubmit } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (docData.text === '') return;
    try {
      await onAddDocSubmit(event);
      await sendPostNotification(postType);
      toggleModal();
    } catch (error) {
      window.alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal onToggleClick={toggleModal} title={`${postType} 작성하기`}>
      <form
        onSubmit={handleSubmit}
        className="overflow-scroll pb-1 scrollbar-hide"
      >
        <QuillEditor
          placeholder={`${postType}을 작성해주세요`}
          text={text}
          setText={setText}
        />
        <SquareBtn
          name="작성 완료"
          type="submit"
          className="ml-auto"
          disabled={isPending}
        />
      </form>
    </Modal>
  );
};

export default PostAddModal;
