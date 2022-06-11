import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import { DocumentType } from "components/bookmeeting/Subjects";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import { BookDocument } from "data/bookAtom";

interface PropsType {
  item: DocumentType;
  thisMonthBook: BookDocument;
}

const BookRecomBox = ({ item, thisMonthBook }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const userData = useRecoilValue(currentUserState);

  const onDeleteClick = async () => {
    const RecommendedBookRef = doc(dbService, "Recommened_Book", `${item.id}`);
    await deleteDoc(RecommendedBookRef);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newText === "") return;
    const RecommendedBookRef = doc(dbService, "Recommened_Book", `${item.id}`);
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
          <form onSubmit={onEditSubmit}>
            <Writer>
              <UserInfoBox creatorId={item.creatorId} />
              <EditDoneBtn type="submit" value="수정완료" />
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
          <Bottom>
            <div>
              <img src={thisMonthBook?.thumbnail} alt="Book_Image" />
              <h3>{thisMonthBook?.title}</h3>
            </div>
            <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          </Bottom>
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
  }
  img {
    width: auto;
    height: 30px;
    margin-top: 10px;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  > div:first-child {
    display: flex;
    align-items: center;
    width: 75%;
    img {
      height: 20px;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
      margin-right: 10px;
      margin-top: 0;
    }
    h3 {
      font-size: 10px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background-color: #eaeaea;
  border: none;
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

const EditDoneBtn = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
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

export default BookRecomBox;
