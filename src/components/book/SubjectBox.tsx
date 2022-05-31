import { useState } from "react";
import { ReactComponent as EditIcon } from "assets/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/delete.svg";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { time } from "util/time";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import UserInfoBox from "components/common/UserInfoBox";

export interface DocumentType {
  id?: string;
  text?: string;
  createdAt?: number;
  creatorId?: string;
  bookTitle?: string;
  bookCover?: string;
}

interface ISubject {
  item: DocumentType;
}

const SubjectBox = ({ item }: ISubject) => {
  const userData = useRecoilValue(currentUserState);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const onDeleteClick = async () => {
    const SubjectTextRef = doc(dbService, "Book_Subjects", `${item.id}`);
    await deleteDoc(SubjectTextRef);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const SubjectTextRef = doc(dbService, "Book_Subjects", `${item.id}`);
    await updateDoc(SubjectTextRef, { text: newText });
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
                <ProfileImg $bgPhoto={userData.photoURL} />
                <span>전예림</span>
              </User>
              <EditDoneBtn type="submit" value="수정완료" />
            </Writer>
            <TextArea
              value={newText}
              placeholder="발제문을 수정해주세요."
              onChange={onChange}
            />
          </form>
          <RegisterTime>{time(item.createdAt)}</RegisterTime>
        </TextBox>
      ) : (
        <TextBox>
          <Writer>
            <UserInfoBox />
            {userData.uid === item.creatorId && (
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
          <AddInfo>
            <Book>
              <img src={item.bookCover} alt="url" />
              <span>{item.bookTitle}</span>
            </Book>
            <RegisterTime>{time(item.createdAt)}</RegisterTime>
          </AddInfo>
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
    padding-bottom: 20px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  white-space: pre-wrap;
  resize: none;
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

const ProfileImg = styled.div<{ $bgPhoto: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.container.lightBlue};
  margin-right: 5px;
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
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

const AddInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Book = styled.div`
  display: flex;
  align-items: end;
  span {
    font-weight: 700;
    font-size: 11px;
  }
  img {
    height: 26px;
    width: auto;
    margin-right: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export default SubjectBox;
