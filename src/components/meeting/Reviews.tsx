import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { time } from "util/time";
import styled from "styled-components";
import { DocumentType } from "components/book/SubjectBox";
import UserInfoBox from "components/common/UserInfoBox";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";

const Reviews = ({ text, createdAt, creatorId, id }: DocumentType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ReviewTextRef = doc(dbService, "Meeting_Review", `${id}`);
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
    const ReviewTextRef = doc(dbService, "Meeting_Review", `${id}`);
    await deleteDoc(ReviewTextRef);
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <Review>
      {editing ? (
        <form onSubmit={onSubmit}>
          <FormHeader>
            <UserInfoBox />
            {showingGuide && (
              <GuideTextBox>
                한 글자 이상 작성해주세요. <div></div>
              </GuideTextBox>
            )}
            {showingGuide ? (
              <EditDoneBtn type="submit" value="수정완료" eventdone />
            ) : (
              <EditDoneBtn type="submit" value="수정완료" />
            )}
          </FormHeader>
          <TextArea
            value={newText}
            placeholder="모임 후기를 수정해주세요."
            onChange={onChange}
          />
          <span>{time(createdAt)}</span>
        </form>
      ) : (
        <form>
          <FormHeader>
            <UserInfoBox />
            {userData.uid === creatorId && (
              <EditDeleteBtn>
                <button onClick={toggleEditing}>수정</button>
                <button onClick={onDeleteClick}>삭제</button>
              </EditDeleteBtn>
            )}
          </FormHeader>
          <p>{text}</p>
          <Time>{time(createdAt)}</Time>
        </form>
      )}
    </Review>
  );
};

const Time = styled.div`
  display: flex;
  justify-content: end;
  font-size: 11px;
  padding: 5px;
`;

const Review = styled.div`
  padding-top: 20px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.gray};
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
  margin-bottom: 5px;
  white-space: pre-wrap;
  border: none;
  border-radius: 5px;
  min-height: 100px;
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

const EditDoneBtn = styled.input<{ eventdone?: boolean }>`
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
  }
`;

export default Reviews;
