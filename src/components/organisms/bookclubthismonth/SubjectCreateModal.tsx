import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { IBookApi } from 'data/bookAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import Overlay from 'components/atoms/Overlay';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import 'react-quill/dist/quill.snow.css';
import QuillEditor from 'components/atoms/QuillEditor';
import AddDocButton from './AddDocButton';
import PostBtn from 'components/atoms/buttons/PostBtn';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

interface PropsType {
  bookInfo: IBookApi;
  docMonth: string;
}

const SubjectCreateModal = ({ bookInfo, docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const collectionName = getFbRoute(docMonth).SUBJECT;
  const userData = useRecoilValue(currentUserState);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('write');
  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData?.uid,
    title: bookInfo?.title,
    thumbnail: bookInfo?.thumbnail,
  };

  const { onAddDocSubmit } = useAddDoc({
    text,
    setText,
    collectionName,
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
        title='발제문 참여하기'
        description='필수 발제자를 포함하여 누구나 참여 가능해요.'
      />
      {modalOpen && (
        <>
          <Overlay onModalClick={onModalClick} />
          <Modal onSubmit={handleSubmit}>
            <h3>
              발제문 작성하기 <Close onClick={onModalClick} />
            </h3>
            <QuillEditor
              placeholder='모임에서 나누고 싶은 주제를 자유롭게 작성해주세요.'
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

export const Modal = styled.form`
  z-index: 2;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid red;
  height: 80vh;
  overflow: scroll;
  margin: 0 auto;
  width: 90%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 17px;
    width: 100%;
    svg {
      cursor: pointer;
    }
  }
  @media ${device.tablet} {
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    gap: 15px;
    > h3 {
      font-size: 18px;
      svg {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export default SubjectCreateModal;
