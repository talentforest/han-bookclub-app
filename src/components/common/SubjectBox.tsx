import { useState } from "react";
import { timestamp } from "util/timestamp";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import EditDeleteButton from "./EditDeleteButton";
import styled from "styled-components";
import device from "theme/mediaQueries";
import useDeleteDoc from "hooks/useDeleteDoc";
import useEditDoc from "hooks/useEditDoc";

export interface IWrittenDocs {
  id?: string;
  text?: string;
  creatorId: string;
  createdAt: number;
  title?: string;
  thumbnail?: string;
  recommendBookTitle?: string;
  recommendBookThumbnail?: string;
  recommendBookUrl?: string;
  recommendBookAuthor?: string[];
}

interface ISubject {
  subject: IWrittenDocs;
  onSubjectRemove?: (targetId: string) => void;
  docMonth?: string;
}

const SubjectBox = ({ subject, onSubjectRemove, docMonth }: ISubject) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(subject.text);
  const collectionName = `BookMeeting Info/${docMonth}/subjects`;

  const { onDeleteClick } = useDeleteDoc({ docId: subject.id, collectionName });
  const { showingGuide, onEditedSubmit, onEditedChange } = useEditDoc({
    docId: subject.id,
    editedText,
    setEditedText,
    setEditing,
    collectionName,
  });

  const handleDeleteClick = async () => {
    onDeleteClick();
    if (onSubjectRemove) {
      onSubjectRemove(subject.id);
    }
  };

  return (
    <Box>
      {editing ? (
        <form onSubmit={onEditedSubmit}>
          <FormHeader>
            <UserInfoBox creatorId={subject.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={subject.creatorId}
              onDeleteClick={handleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </FormHeader>
          <TextArea
            value={editedText}
            placeholder="발제문을 수정해주세요."
            onChange={onEditedChange}
          />
          <RegisterTime>{timestamp(subject.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={subject.thumbnail}
            title={subject.title}
            smSize={"smSize"}
          />
        </form>
      ) : (
        <>
          <FormHeader>
            <UserInfoBox creatorId={subject.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={subject.creatorId}
              onDeleteClick={handleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </FormHeader>
          <pre>{editedText}</pre>
          <RegisterTime>{timestamp(subject.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={subject.thumbnail}
            title={subject.title}
            smSize={"smSize"}
          />
        </>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  padding: 15px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  min-height: 150px;
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    padding-bottom: 10px;
    min-height: 100px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  @media ${device.tablet} {
    margin-bottom: 15px;
    padding: 20px 25px;
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

export default SubjectBox;
