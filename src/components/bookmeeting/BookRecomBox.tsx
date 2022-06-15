import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import {
  DocumentType,
  DoneBtn,
  EditDeleteIcon,
  FormHeader,
  GuideTextBox,
} from "components/bookmeeting/Subjects";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import { BookDocument } from "data/bookAtom";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import { thisYearMonth } from "util/constants";

interface PropsType {
  item: DocumentType;
  thisMonthBook: BookDocument;
}

const BookRecomBox = ({ item, thisMonthBook }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const RecommendedBookRef = doc(
    dbService,
    `BookMeeting Info/${thisYearMonth}/recommended book`,
    `${item.id}`
  );

  const onEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(RecommendedBookRef, { text: newText });
    if (newText === "") {
      setTimeout(() => {
        setShowingGuide((toggle) => !toggle);
      }, 1000);
      setShowingGuide((toggle) => !toggle);
      setEditing(true);
    } else {
      setShowingGuide(false);
      setEditing(false);
    }
  };

  const onDeleteClick = async () => {
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
            <FormHeader>
              <UserInfoBox creatorId={item.creatorId} />
              {showingGuide && (
                <GuideTextBox>
                  한 글자 이상 작성해주세요. <div></div>
                </GuideTextBox>
              )}
              {showingGuide ? (
                <DoneBtn type="submit" value="수정완료" eventdone />
              ) : (
                <DoneBtn type="submit" value="수정완료" />
              )}
            </FormHeader>
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
          <FormHeader>
            <UserInfoBox creatorId={item.creatorId} />
            {userData.uid === item.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </FormHeader>
          <pre>{newText}</pre>
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          <BookTitleImgBox docData={thisMonthBook} smSize={"smSize"} />
        </TextBox>
      )}
    </>
  );
};

const TextBox = styled.div`
  position: relative;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
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
  word-wrap: break-word;
  resize: none;
  padding: 5px;
  &:focus {
    outline: none;
  }
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
`;

export default BookRecomBox;
