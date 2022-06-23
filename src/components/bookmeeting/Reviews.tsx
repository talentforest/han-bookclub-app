import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { timestamp } from "util/timestamp";
import {
  DocumentType,
  DoneBtn,
  FormHeader,
  GuideTextBox,
  RegisterTime,
} from "components/bookmeeting/Subjects";
import { BookDocument } from "data/bookAtom";
import { thisYearMonth } from "util/constants";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import EditDeleteDoc from "components/common/EditDeleteDoc";
import device from "theme/mediaQueries";

interface PropsType {
  item: DocumentType;
  onReviewRemove?: (id: string) => void;
  bookInfo?: BookDocument;
  docMonth?: string;
}

const Reviews = ({ item, onReviewRemove }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ReviewTextRef = doc(
      dbService,
      `BookMeeting Info/${thisYearMonth}/reviews`,
      `${item.id}`
    );
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
    const ReviewTextRef = doc(
      dbService,
      `BookMeeting Info/${thisYearMonth}/reviews`,
      `${item.id}`
    );
    await deleteDoc(ReviewTextRef);

    if (onReviewRemove) {
      onReviewRemove(item.id);
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
            placeholder="모임 후기를 수정해주세요."
            onChange={onChange}
          />
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          <BookTitleImgBox docData={item} smSize={"smSize"} />
        </form>
      ) : (
        <>
          <FormHeader>
            <UserInfoBox creatorId={item.creatorId} />
            <EditDeleteDoc
              creatorId={item.creatorId}
              onDeleteClick={onDeleteClick}
              toggleEditing={toggleEditing}
            />
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
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    padding-bottom: 5px;
    margin: 10px;
    font-size: 14px;
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
    padding-bottom: 30px;
    pre {
      font-size: 18px;
      min-height: 200px;
    }
  }
  @media ${device.tablet} {
    padding: 20px;
  }
`;

const TextArea = styled.textarea`
  font-size: 14px;
  width: 100%;
  padding: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: none;
  border-radius: 5px;
  height: 60px;
  line-height: 1.3;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  resize: none;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 200px;
  }
`;

export default Reviews;
