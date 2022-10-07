import useEditDeleteDoc from "hooks/useEditDeleteDoc";
import { useState } from "react";
import styled from "styled-components";
import { cutLetter } from "util/cutLetter";
import { timestamp } from "util/timestamp";
import EditDeleteButton from "./EditDeleteButton";
import Overlay from "./Overlay";
import { TextArea } from "./RecommandBox";
import { IWrittenDocs } from "./SubjectBox";
import UserInfoBox from "./UserInfoBox";

interface IHostReviewBoxProps {
  review: IWrittenDocs;
  yearMonthId: string;
}

const HostReviewBox = ({ review, yearMonthId }: IHostReviewBoxProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(review.text);
  const collectionName = `BookMeeting Info/${yearMonthId}/host review`;

  const { showingGuide, onNewTextSubmit, onDeleteClick, onNewTextChange } =
    useEditDeleteDoc({
      docId: review.id,
      newText,
      setNewText,
      collectionName,
      setEditing,
    });

  return (
    <>
      {!openModal && (
        <ReviewBox>
          <pre>{cutLetter(review.text, 210)}</pre>
          <button
            onClick={() => {
              setOpenModal((prev) => !prev);
            }}
          >
            발제자의 정리 더보기
          </button>
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
              <pre>{newText}</pre>
            </Modal>
          ) : (
            <Modal $editing={editing} onSubmit={onNewTextSubmit}>
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
              <TextEditArea
                value={newText}
                placeholder="수정해주세요."
                onChange={onNewTextChange}
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
  pre {
    margin-bottom: 10px;
  }
  button {
    align-self: end;
    background-color: ${(props) => props.theme.container.orange};
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: 30px;
    padding: 8px 15px;
    margin: 5px 0;
    font-weight: 700;
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

const TextEditArea = styled(TextArea)`
  height: 80vh;
  padding: 10px;
  margin: 10px 0;
`;

const TimeStamp = styled.span`
  font-size: 14px;
  align-self: end;
`;

export default HostReviewBox;
