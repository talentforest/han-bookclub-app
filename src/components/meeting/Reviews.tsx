import { ReactComponent as UserIcon } from "assets/account_circle.svg";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Time } from "util/Time";
import styled from "styled-components";

interface PropsType {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
  uid: string;
}

const Reviews = ({ text, createdAt, creatorId, id, uid }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const onDeleteClick = async () => {
    const ReviewTextRef = doc(dbService, "meetingReview", `${id}`);
    await deleteDoc(ReviewTextRef);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ReviewTextRef = doc(dbService, "meetingReview", `${id}`);
    await updateDoc(ReviewTextRef, { text: newText });
    setEditing(false);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  return (
    <>
      {editing ? (
        <Review>
          <form onSubmit={onSubmit}>
            <div>
              <UserIcon width="16" height="16" />
              <span>전예림</span>
            </div>
            <EditDoneBtn type="submit" value="수정완료" />
            <TextArea
              value={newText}
              placeholder="발제문을 수정해주세요."
              onChange={onChange}
            />
          </form>
        </Review>
      ) : (
        <Review>
          <div>
            <div>
              <UserIcon width="16" height="16" />
              <span>전예림</span>
              <span>{Time(createdAt)}</span>
            </div>
            {uid === creatorId && (
              <EditDeleteBtn>
                <button onClick={toggleEditing}>수정</button>
                <button onClick={onDeleteClick}>삭제</button>
              </EditDeleteBtn>
            )}
          </div>
          <p>{text}</p>
        </Review>
      )}
    </>
  );
};

const EditDoneBtn = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  white-space: pre-wrap;
  &:focus {
    outline: none;
  }
`;

const Review = styled.div`
  padding: 10px 0 15px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      font-size: 13px;
      > svg {
        margin-right: 3px;
      }
      > span:last-child {
        font-size: 10px;
        color: ${(props) => props.theme.text.lightGray};
        margin-left: 8px;
      }
    }
  }
  > div:last-child {
  }
  > p {
    /* border: 1px solid red; */
    margin-top: 8px;
  }
`;

const EditDeleteBtn = styled.div`
  button {
    border: none;
    border-radius: 5px;
    font-size: 10px;
    background-color: transparent;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

export default Reviews;
