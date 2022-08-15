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
} from "components/bookmeeting/Subjects";
import { IBookApi } from "data/bookAtom";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import EditDeleteDoc from "components/common/EditDeleteDoc";
import device from "theme/mediaQueries";

interface PropsType {
  item: IWrittenDocs;
  onReviewRemove?: (id: string) => void;
  bookInfo?: IBookApi;
  docMonth?: string;
}

const Reviews = ({ item, onReviewRemove, docMonth }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);

  const ReviewTextRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/reviews`,
    `${item.id}`
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

export const TextBox = styled.div`
  padding: 20px 10px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 16px;
    min-height: 60px;
    margin: 10px 0;
  }
  @media ${device.tablet} {
    padding: 15px;
    pre {
      font-size: 18px;
      min-height: 100px;
    }
  }
`;

export const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: none;
  border-radius: 5px;
  height: 100px;
  line-height: 1.6;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  resize: none;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 100px;
  }
`;

export default Reviews;
