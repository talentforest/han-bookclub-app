import { ReactComponent as UserIcon } from "assets/account_circle.svg";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Time } from "util/Time";
import styled from "styled-components";
import { DocumentType } from "components/book/SubjectBox";

const Reviews = ({ text, createdAt, creatorId, id, uid }: DocumentType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ReviewTextRef = doc(dbService, "Meeting_Review", `${id}`);
    await updateDoc(ReviewTextRef, { text: newText });
    setEditing(false);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const onDeleteClick = async () => {
    const ReviewTextRef = doc(dbService, "Meeting_Review", `${id}`);
    await deleteDoc(ReviewTextRef);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <Review>
      {editing ? (
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <UserIcon />
              <span>전예림</span>
              <span>{Time(createdAt)}</span>
            </div>
            <EditDoneBtn type="submit" value="수정완료" />
          </div>
          <textarea
            value={newText}
            placeholder="발제문을 수정해주세요."
            onChange={onChange}
          />
        </form>
      ) : (
        <form>
          <div>
            <div>
              <UserIcon />
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
        </form>
      )}
    </Review>
  );
};

const Review = styled.div`
  padding: 10px 0 0px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > form {
    margin: 0 5px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      > div {
        display: flex;
        align-items: center;
        > span:nth-child(3) {
          font-size: 12px;
          margin-left: 8px;
          color: ${(props) => props.theme.text.lightGray};
        }
      }
    }
    > textarea {
      font-size: 14px;
      width: 100%;
      border: none;
      min-height: 45px;
      background-color: transparent;
      white-space: pre-wrap;
      &:focus {
        outline: none;
      }
    }
    > p {
      display: block;
      min-height: 45px;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const EditDoneBtn = styled.input`
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  cursor: pointer;
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
