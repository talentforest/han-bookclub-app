import { useState } from "react";
import { SubmitBtn } from "theme/commonStyle";
import { Close } from "@mui/icons-material";
import { IBookApi } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Overlay from "components/common/Overlay";
import useAddDoc from "hooks/useAddDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "components/common/QuillEditor";
import AddDocButton from "./AddDocButton";

interface PropsType {
  bookInfo: IBookApi;
  docMonth: string;
}

const SubjectCreateModal = ({ bookInfo, docMonth }: PropsType) => {
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const collectionName = `BookMeeting Info/${docMonth}/subjects`;
  const userData = useRecoilValue(currentUserState);

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: bookInfo.title,
    thumbnail: bookInfo.thumbnail,
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
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <AddDocButton
        onModalClick={onModalClick}
        title="발제문 참여하기"
        description="필수 발제자를 포함하여 누구나 참여 가능해요."
      />
      {modalOpen ? (
        <>
          <Overlay onModalClick={onModalClick} />
          <Modal onSubmit={handleSubmit}>
            <h3>
              발제문 작성하기 <Close onClick={onModalClick} />
            </h3>
            <QuillEditor
              editing={true}
              placeholder="모임에서 나누고 싶은 주제를 자유롭게 작성해주세요."
              content={text}
              setContent={setText}
            />
            <SubmitBtn type="submit" value="남기기" />
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Modal = styled.form`
  z-index: 2;
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  > h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
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
