import { Close } from "@mui/icons-material";
import { useState } from "react";
import { IBookApi } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Modal } from "./SubjectCreateModal";
import Overlay from "components/common/Overlay";
import useAddDoc from "hooks/useAddDoc";
import QuillEditor from "components/common/QuillEditor";
import AddDocButton from "./AddDocButton";
import PostButton from "components/common/PostButton";

interface PropsType {
  docMonth: string;
  bookInfo: IBookApi;
}

const HostReviewCreateModal = ({ docMonth, bookInfo }: PropsType) => {
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const collectionName = `BookMeeting Info/${docMonth}/host review`;
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
        title="발제자의 모임 정리 기록하기"
        description="이달의 발제자만 작성 가능해요."
      />
      {modalOpen && (
        <>
          <Overlay onModalClick={onModalClick} />
          <Modal onSubmit={handleSubmit}>
            <h3>
              발제자의 정리 기록 작성하기 <Close onClick={onModalClick} />
            </h3>
            <QuillEditor
              editing={true}
              placeholder="발제자는 모임 후 모임에서 나눈 이야기를 자유롭게 작성해주세요."
              content={text}
              setContent={setText}
            />
            <PostButton value="남기기" />
          </Modal>
        </>
      )}
    </>
  );
};

export default HostReviewCreateModal;
