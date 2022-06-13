import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { timestamp } from "util/timestamp";
import { DocumentType } from "components/bookmeeting/Subjects";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import { BookDocument } from "data/bookAtom";
import { thisYearMonth } from "util/constants";

interface PropsType {
  item: DocumentType;
  onReviewRemove?: (id: string) => void;
  bookInfo?: BookDocument;
}

const Reviews = ({ item, onReviewRemove }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

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

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const onDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <Review>
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
          <AddInfo>
            <Book>
              <img src={item.thumbnail} alt="url" />
              <span>{item.title}</span>
            </Book>
            <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          </AddInfo>
        </form>
      ) : (
        <form>
          <FormHeader>
            <UserInfoBox creatorId={item.creatorId} />
            {userData.uid === item.creatorId && (
              <EditDeleteBtn>
                <button onClick={toggleEditing}>수정</button>
                <button onClick={onDeleteClick}>삭제</button>
              </EditDeleteBtn>
            )}
          </FormHeader>
          <p>{newText}</p>
          <AddInfo>
            <Book>
              <img src={item.thumbnail} alt="url" />
              <span>{item.title}</span>
            </Book>
            <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          </AddInfo>
        </form>
      )}
    </Review>
  );
};

const Review = styled.div`
  padding-top: 20px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.container.default};
  > form {
    position: relative;
    margin: 0 5px;
    > p {
      display: block;
      min-height: 30px;
      padding-bottom: 5px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  > span {
    font-size: 12px;
    margin-left: 8px;
    color: ${(props) => props.theme.text.lightGray};
  }
`;

const TextArea = styled.textarea`
  font-size: 14px;
  width: 100%;
  padding: 5px;
  white-space: pre-wrap;
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
`;

const GuideTextBox = styled.span`
  position: absolute;
  right: 2px;
  top: 24px;
  font-size: 10px;
  color: ${(props) => props.theme.text.accent};
  background-color: ${(props) => props.theme.container.lightBlue};
  padding: 2px 4px;
  border-radius: 6px;
  > div {
    width: 8px;
    height: 8px;
    position: absolute;
    top: -4px;
    right: 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.container.lightBlue};
  }
`;

const DoneBtn = styled.input<{ eventdone?: boolean }>`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
  pointer-events: ${(props) => (props.eventdone ? "none" : "fill")};
`;

const EditDeleteBtn = styled.div`
  button {
    border: none;
    border-radius: 5px;
    font-size: 12px;
    background-color: transparent;
    color: ${(props) => props.theme.text.lightBlue};
    cursor: pointer;
  }
`;

const AddInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 10px 0;
`;

const Book = styled.div`
  display: flex;
  align-items: end;
  width: 75%;
  span {
    font-size: 11px;
  }
  img {
    height: 18px;
    width: auto;
    margin-right: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
`;

export default Reviews;
