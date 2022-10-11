import { useState } from "react";
import { timestamp } from "util/timestamp";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import useDeleteDoc from "hooks/useDeleteDoc";
import useEditDoc from "hooks/useEditDoc";
import QuillEditor from "./QuillEditor";
import "react-quill/dist/quill.snow.css";
import FormHeader from "components/template/FormHeader";

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
  const { showingGuide, onEditedSubmit } = useEditDoc({
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
      <form onSubmit={onEditedSubmit}>
        <FormHeader
          editing={editing}
          showingGuide={showingGuide}
          creatorId={subject.creatorId}
          onDeleteClick={handleDeleteClick}
          toggleEditing={() => {
            setEditing((prev) => !prev);
          }}
        />
        <QuillEditor
          editing={editing}
          placeholder="발제문을 수정해주세요."
          content={editedText}
          setContent={setEditedText}
        />
      </form>
      <RegisterTime>{timestamp(subject.createdAt)}</RegisterTime>
      <BookTitleImgBox
        thumbnail={subject.thumbnail}
        title={subject.title}
        smSize={"smSize"}
      />
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
  @media ${device.tablet} {
    margin-bottom: 15px;
    padding: 20px 25px;
    border-radius: 10px;
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
