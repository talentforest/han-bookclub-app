import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import {
  DocumentType,
  DoneBtn,
  EditDeleteIcon,
} from "components/bookmeeting/Subjects";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import { BookDocument } from "data/bookAtom";
import BookTitleImgBox from "components/common/BookTitleImgBox";

interface PropsType {
  item: DocumentType;
  thisMonthBook: BookDocument;
}

const BookRecomBox = ({ item, thisMonthBook }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const userData = useRecoilValue(currentUserState);

  const onEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newText === "") return;
    const RecommendedBookRef = doc(dbService, "Recommened_Book", `${item.id}`);
    await updateDoc(RecommendedBookRef, { text: newText });
    setEditing(false);
  };

  const onDeleteClick = async () => {
    const RecommendedBookRef = doc(dbService, "Recommened_Book", `${item.id}`);
    await deleteDoc(RecommendedBookRef);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      {editing ? (
        <TextBox>
          <form onSubmit={onEditSubmit}>
            <Writer>
              <UserInfoBox creatorId={item.creatorId} />
              <DoneBtn type="submit" value="수정완료" />
            </Writer>
            <TextArea
              value={newText}
              placeholder="수정해주세요."
              onChange={onChange}
            />
          </form>
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
        </TextBox>
      ) : (
        <TextBox>
          <Writer>
            <UserInfoBox creatorId={item.creatorId} />
            {userData.uid === item.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </Writer>
          <pre>{newText}</pre>
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          <BookTitleImgBox docData={thisMonthBook} smSize={"smSize"} />
        </TextBox>
      )}
    </>
  );
};

const TextBox = styled.div`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  pre {
    white-space: pre-wrap;
    line-height: 22px;
    font-size: 15px;
    min-height: 70px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background-color: #eaeaea;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  white-space: pre-wrap;
  resize: none;
  padding: 5px;
  &:focus {
    outline: none;
  }
`;

const Writer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
`;

export default BookRecomBox;
