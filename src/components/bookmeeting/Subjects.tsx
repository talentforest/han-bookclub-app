import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import device from "theme/mediaQueries";

export interface DocumentType {
  id: string;
  text?: string;
  creatorId: string;
  createdAt: number;
  title?: string;
  thumbnail?: string;
  recommendBookTitle?: string;
  recommendBookThumbnail?: string;
  recommendBookUrl?: string;
  recommendBookAuthor?: [];
}

interface ISubject {
  item: DocumentType;
  onSubjectRemove?: (targetId: string) => void;
  docMonth?: string;
}

const Subjects = ({ item, onSubjectRemove, docMonth }: ISubject) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const thisMonthSubjectRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/subjects`,
    `${item.id}`
  );

  const otherMonthSubjectRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/subjects`,
    `${item.id}`
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!docMonth) {
      await updateDoc(thisMonthSubjectRef, { text: newText });
    } else {
      await updateDoc(otherMonthSubjectRef, { text: newText });
    }
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
    await deleteDoc(thisMonthSubjectRef);
    if (onSubjectRemove) {
      onSubjectRemove(item.id);
    }
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <TextBox>
      {editing ? (
        <form onSubmit={onSubmit}>
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
            placeholder="발제문을 수정해주세요."
            onChange={onChange}
          />
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          <BookTitleImgBox docData={item} smSize={"smSize"} />
        </form>
      ) : (
        <>
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
          <BookTitleImgBox docData={item} smSize={"smSize"} />
        </>
      )}
    </TextBox>
  );
};

const TextBox = styled.div`
  width: 100%;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  min-height: 200px;
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    padding-bottom: 10px;
    min-height: 200px;
    margin-bottom: 15px;
    font-size: 17px;
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
    padding: 20px 30px;
    border-radius: 10px;
    pre {
      font-size: 18px;
    }
  }
`;

export const FormHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

export const DoneBtn = styled.input<{ eventdone?: boolean }>`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
  pointer-events: ${(props) => (props.eventdone ? "none" : "fill")};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export const EditDeleteIcon = styled.div`
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
  @media ${device.tablet} {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const GuideTextBox = styled.span`
  position: absolute;
  right: 0px;
  top: 30px;
  font-size: 10px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.yellow};
  padding: 2px 4px;
  border-radius: 6px;
  > div {
    width: 8px;
    height: 8px;
    position: absolute;
    top: -4px;
    right: 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.container.yellow};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  border: none;
  background-color: ${(props) => props.theme.container.lightBlue};
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  padding: 5px;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export const RegisterTime = styled.div`
  color: ${(props) => props.theme.text.gray};
  font-size: 13px;
  text-align: end;
  margin-bottom: 5px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default Subjects;
