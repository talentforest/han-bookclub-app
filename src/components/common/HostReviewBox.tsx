import { useState } from "react";
import { clubInfoCollection } from "util/constants";
import { cutLetter } from "util/cutLetter";
import { timestamp } from "util/timestamp";
import { IWrittenDocs } from "./SubjectBox";
import useDeleteDoc from "hooks/handleFirebaseDoc/useDeleteDoc";
import useEditDoc from "hooks/handleFirebaseDoc/useEditDoc";
import UserInfoBox from "./UserInfoBox";
import EditDeleteButton from "./EditDeleteButton";
import Overlay from "./Overlay";
import QuillEditor from "./QuillEditor";
import styled from "styled-components";
import ShareButton from "./ShareButton";

interface IHostReviewBoxProps {
  review: IWrittenDocs;
  yearMonthId: string;
}

const HostReviewBox = ({ review, yearMonthId }: IHostReviewBoxProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(review.text);

  const collectionName = clubInfoCollection(yearMonthId).HOST_REVIEW;
  const { onDeleteClick } = useDeleteDoc({ docId: review.id, collectionName });
  const { showingGuide, onEditedSubmit } = useEditDoc({
    docId: review.id,
    editedText,
    setEditedText,
    setEditing,
    collectionName,
  });

  return (
    <>
      {!openModal && (
        <ReviewBox>
          <QuillEditor
            editing={editing}
            content={cutLetter(review.text, 210)}
            setContent={setEditedText}
          />
          <div>
            <ShareButton
              title="새로운 모임 기록이 등록되었어요~🚀"
              description="이번달 발제자의 모임 기록을 한번 보러 가볼까요?🤩"
              path="bookclub"
            />
            <button
              onClick={() => {
                setOpenModal((prev) => !prev);
              }}
            >
              발제자의 정리 더보기
            </button>
          </div>
        </ReviewBox>
      )}
      {openModal && (
        <>
          <Overlay
            onModalClick={() => {
              setOpenModal((prev) => !prev);
            }}
          />
          {!editing ? (
            <Modal $editing={editing}>
              <header>
                <div>
                  <h4>발제자의 모임 정리</h4>
                  <UserInfoBox creatorId={review.creatorId} />
                </div>
                <EditDeleteButton
                  editing={editing}
                  showingGuide={showingGuide}
                  creatorId={review.creatorId}
                  onDeleteClick={onDeleteClick}
                  toggleEditing={() => setEditing((prev) => !prev)}
                />
              </header>
              <QuillEditor
                editing={editing}
                content={editedText}
                setContent={setEditedText}
              />
            </Modal>
          ) : (
            <Modal $editing={editing} onSubmit={onEditedSubmit}>
              <header>
                <div>
                  <h4>발제자의 모임 정리</h4>
                  <UserInfoBox creatorId={review.creatorId} />
                </div>
                <EditDeleteButton
                  editing={editing}
                  showingGuide={showingGuide}
                  creatorId={review.creatorId}
                  onDeleteClick={onDeleteClick}
                  toggleEditing={() => setEditing((prev) => !prev)}
                />
              </header>
              <QuillEditor
                editing={editing}
                placeholder="기록을 수정해주세요."
                content={editedText}
                setContent={setEditedText}
              />
              <TimeStamp>{timestamp(review.createdAt)}</TimeStamp>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  > pre {
    margin-bottom: 10px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > button:last-child {
      background-color: ${(props) => props.theme.container.orange};
      box-shadow: ${(props) => props.theme.boxShadow};
      border-radius: 30px;
      border: none;
      padding: 8px 15px;
      font-weight: 700;
    }
  }
`;

const Modal = styled.form<{ $editing: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: scroll;
  width: 80vw;
  height: 85vh;
  top: 30px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 5px;
  z-index: 2;
  background-color: ${(props) =>
    props.$editing
      ? props.theme.text.lightGray
      : props.theme.container.default};
  padding: 20px;
  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    > div {
      display: flex;
      h4 {
        font-weight: 700;
        margin-right: 10px;
      }
    }
  }
`;

const TimeStamp = styled.span`
  font-size: 14px;
  align-self: end;
`;

export default HostReviewBox;
