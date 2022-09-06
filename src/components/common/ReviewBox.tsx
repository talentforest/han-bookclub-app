import { useState } from "react";
import { timestamp } from "util/timestamp";
import {
  IWrittenDocs,
  FormHeader,
  RegisterTime,
} from "components/common/SubjectBox";
import { IBookApi } from "data/bookAtom";
import { Form, TextArea } from "./RecommandBox";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import EditDeleteButton from "components/common/EditDeleteButton";
import useEditDeleteDoc from "hooks/useEditDeleteDoc";

interface PropsType {
  review: IWrittenDocs;
  bookInfo?: IBookApi;
  docMonth?: string;
  onReviewRemove?: (id: string) => void;
}

const ReviewBox = ({ review, docMonth, onReviewRemove }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(review.text);
  const collectionName = `BookMeeting Info/${docMonth}/reviews`;

  const { showingGuide, onNewTextSubmit, onDeleteClick, onNewTextChange } =
    useEditDeleteDoc({
      docId: review.id,
      newText,
      setNewText,
      collectionName,
      setEditing,
    });

  const handleDeleteClick = async () => {
    onDeleteClick();
    if (onReviewRemove) {
      onReviewRemove(review.id);
    }
  };

  return (
    <>
      {editing ? (
        <Form onSubmit={onNewTextSubmit}>
          <FormHeader>
            <UserInfoBox creatorId={review.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={review.creatorId}
              onDeleteClick={handleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </FormHeader>
          <TextArea
            value={newText}
            placeholder="모임 후기를 수정해주세요."
            onChange={onNewTextChange}
          />
          <RegisterTime>{timestamp(review.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={review.thumbnail}
            title={review.title}
            smSize={"smSize"}
          />
        </Form>
      ) : (
        <Form>
          <FormHeader>
            <UserInfoBox creatorId={review.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={review.creatorId}
              onDeleteClick={handleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </FormHeader>
          <pre>{newText}</pre>
          <RegisterTime>{timestamp(review.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={review.thumbnail}
            title={review.title}
            smSize={"smSize"}
          />
        </Form>
      )}
    </>
  );
};

export default ReviewBox;
