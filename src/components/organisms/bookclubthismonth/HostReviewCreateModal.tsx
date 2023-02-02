import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import { Modal } from './SubjectCreateModal';
import { thisMonthClubState } from 'data/documentsAtom';
import Overlay from 'components/atoms/Overlay';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import QuillEditor from 'components/atoms/QuillEditor';
import AddDocButton from './AddDocButton';
import PostBtn from 'components/atoms/buttons/PostBtn';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

const HostReviewCreateModal = () => {
  const [text, setText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const thisMonthClub = useRecoilValue(thisMonthClubState);
  const userData = useRecoilValue(currentUserState);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');
  const {
    id,
    book: { thumbnail, title },
  } = thisMonthClub;
  const collName = getFbRoute(id).HOST_REVIEW;
  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData?.uid,
    title,
    thumbnail,
  };

  const { onAddDocSubmit } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onAddDocSubmit(event);
    if (setModalOpen) return setModalOpen(false);
  };

  const onModalClick = () => {
    if (anonymous) return alertAskJoinMember();
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <AddDocButton
        onModalClick={onModalClick}
        title='발제자의 정리 기록 작성하기'
        description='이달의 발제자만 작성 가능해요.'
      />
      {modalOpen && (
        <>
          <Overlay onModalClick={onModalClick} />
          <Modal onSubmit={handleSubmit}>
            <h3>
              발제자의 모임 정리 기록 <Close onClick={onModalClick} />
            </h3>
            <QuillEditor
              placeholder='발제자는 모임 후 모임에서 나눈 이야기를 자유롭게 작성해주세요.'
              text={text}
              setText={setText}
            />
            <PostBtn value='남기기' />
          </Modal>
        </>
      )}
    </>
  );
};

export default HostReviewCreateModal;
