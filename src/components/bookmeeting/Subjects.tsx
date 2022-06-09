import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import { thisYearMonth } from "util/constants";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";

export interface DocumentType {
  id: string;
  text?: string;
  creatorId: string;
  createdAt: number;
  title?: string;
  thumbnail?: string;
}

interface ISubject {
  item: DocumentType;
  onSubjectRemove?: (targetId: string) => void;
}

const Subjects = ({ item, onSubjectRemove }: ISubject) => {
  const userData = useRecoilValue(currentUserState);
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const onDeleteClick = async () => {
    const SubjectTextRef = doc(
      dbService,
      `BookMeeting Info/${thisYearMonth}/subjects`,
      `${item.id}`
    );
    await deleteDoc(SubjectTextRef);
    if (onSubjectRemove) {
      onSubjectRemove(item.id);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const SubjectTextRef = doc(
      dbService,
      `BookMeeting Info/${thisYearMonth}/subjects`,
      `${item.id}`
    );
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
              <UserInfoBox creatorId={item.creatorId} />
              <DoneBtn type="submit" value="수정완료" />
            </Writer>
            <TextArea
              value={newText}
              placeholder="발제문을 수정해주세요."
              onChange={onChange}
            />
          </form>
          <AddInfo>
            <Book>
              <img src={item.thumbnail} alt="url" />
              <span>{item.title}</span>
            </Book>
            <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          </AddInfo>
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
          <AddInfo>
            <Book>
              <img src={item.thumbnail} alt="url" />
              <span>{item.title}</span>
            </Book>
            <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
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
  background-color: ${(props) => props.theme.container.lightBlue};
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
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

const DoneBtn = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
`;

const EditDeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  svg {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    cursor: pointer;
  }
  svg:first-child {
    margin-left: 0px;
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
  width: 75%;
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

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
`;

export default Subjects;
