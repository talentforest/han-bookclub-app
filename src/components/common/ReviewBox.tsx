import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { timestamp } from "util/timestamp";
import {
  IWrittenDocs,
  DoneBtn,
  FormHeader,
  GuideTextBox,
  RegisterTime,
} from "components/common/SubjectBox";
import { IBookApi } from "data/bookAtom";
import { Form, TextArea } from "./RecommandBox";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import EditDeleteDoc from "components/common/EditDeleteDoc";

interface PropsType {
  review: IWrittenDocs;
  onReviewRemove?: (id: string) => void;
  bookInfo?: IBookApi;
  docMonth?: string;
}

const ReviewBox = ({ review, onReviewRemove, docMonth }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(review.text);
  const [showingGuide, setShowingGuide] = useState(false);

  const ReviewTextRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/reviews`,
    `${review.id}`
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(ReviewTextRef, { text: newText });
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
    await deleteDoc(ReviewTextRef);
    if (onReviewRemove) {
      onReviewRemove(review.id);
    }
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      {editing ? (
        <Form onSubmit={onSubmit}>
          <FormHeader>
            <UserInfoBox creatorId={review.creatorId} />
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
            placeholder="모임 후기를 수정해주세요."
            onChange={onChange}
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
            <EditDeleteDoc
              creatorId={review.creatorId}
              onDeleteClick={onDeleteClick}
              toggleEditing={toggleEditing}
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
