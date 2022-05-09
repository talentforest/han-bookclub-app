import { useState } from "react";
import { ReactComponent as EditIcon } from "assets/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/delete.svg";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Time } from "util/Time";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import styled from "styled-components";
import { deleteObject, ref } from "firebase/storage";

interface PropsType {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
  uid: string;
  attachmentUrl: string;
}

const BookRecommendationBox = ({
  text,
  createdAt,
  creatorId,
  id,
  uid,
  attachmentUrl,
}: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const onDeleteClick = async () => {
    const RecommendedBookRef = doc(dbService, "Books_I_recommened", `${id}`);
    await deleteDoc(RecommendedBookRef);
  };

  const onEditFileClick = async () => {
    await deleteObject(ref(storageService, attachmentUrl));
  };

  // const onClearAttachmentClick = () => setAttachment(null);

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const RecommendedBookRef = doc(dbService, "Books_I_recommened", `${id}`);
    await updateDoc(RecommendedBookRef, { text: newText });
    setEditing(false);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  return (
    <>
      {editing ? (
        <TextBox>
          <form onSubmit={onSubmit}>
            <Writer>
              <User>
                <ProfileImg />
                <span>전예림</span>
              </User>
              <EditDoneBtn type="submit" value="수정완료" />
            </Writer>
            <TextArea
              value={newText}
              placeholder="수정해주세요."
              onChange={onChange}
            />
            {attachmentUrl && (
              <DeleteImg>
                <img src={attachmentUrl} alt="attachment" />
                <button onClick={onEditFileClick}>
                  <CloseIcon />
                </button>
              </DeleteImg>
            )}
          </form>
          <RegisterTime>{Time(createdAt)}</RegisterTime>
        </TextBox>
      ) : (
        <TextBox>
          <Writer>
            <User>
              <ProfileImg />
              <span>전예림</span>
            </User>
            {uid === creatorId && (
              <EditDeleteIcon>
                <EditIcon
                  role="button"
                  onClick={toggleEditing}
                  width="18"
                  height="18"
                />
                <DeleteIcon
                  role="button"
                  onClick={onDeleteClick}
                  width="16"
                  height="16"
                />
              </EditDeleteIcon>
            )}
          </Writer>
          <pre>{newText}</pre>
          {attachmentUrl && <img src={attachmentUrl} alt="attachment" />}
          <RegisterTime>{Time(createdAt)}</RegisterTime>
        </TextBox>
      )}
    </>
  );
};

const TextBox = styled.div`
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  pre {
    white-space: pre-wrap;
    line-height: 22px;
  }
  img {
    width: auto;
    height: 100px;
    margin-top: 10px;
  }
`;

const DeleteImg = styled.div`
  width: fit-content;
  position: relative;
  button {
    position: absolute;
    top: 2px;
    right: -10px;
    border: none;
    background-color: transparent;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;
  border: none;
  font-size: 16px;
  white-space: pre-wrap;
  &:focus {
    outline: none;
  }
`;

const Writer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
`;

const EditDoneBtn = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.container.lightBlue};
  margin-right: 5px;
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
  padding: 5px 0 10px;
`;

const EditDeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default BookRecommendationBox;
