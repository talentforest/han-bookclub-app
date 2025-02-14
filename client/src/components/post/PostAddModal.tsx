import { FormEvent, useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useHandlePenalty, { PenaltyPost } from 'hooks/useHandlePenalty';
import useSendPushNotification from 'hooks/useSendPushNotification';

import { thisMonthClubAtom } from 'data/clubAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { HOST_REVIEW, SUBJECTS } from 'appConstants';
import { getFbRouteOfPost } from 'utils';

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

  const thisMonthClub = useRecoilValue(thisMonthClubAtom);
  const { uid } = useRecoilValue(currAuthUserAtom);

  const { sendPostNotification } = useSendPushNotification();

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
    createdAt: Date.now(),
    creatorId: uid,
    title: bookTitle,
    thumbnail,
  };

  const { isOverdueSubject, isOverdueEndOfThisMonth, updatePenaltyMonth } =
    useHandlePenalty(docData.createdAt);

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
      updatePenaltyMonth(postType as keyof PenaltyPost);
    }

    if (docData.text !== '') {
      sendPostNotification(postType);
    }
    toggleModal();
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

        <SquareBtn name="작성 완료" type="submit" className="ml-auto" />
      </form>
    </Modal>
  );
};

export default PostAddModal;
