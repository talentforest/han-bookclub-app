import { DoneBtn, GuideTextBox } from "components/bookmeeting/Subjects";
import EditDeleteDoc from "components/common/EditDeleteDoc";
import UserInfoBox from "components/common/UserInfoBox";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { UpdateRequestDoc } from "util/getFirebaseDoc";
import { timestamp } from "util/timestamp";

interface PropsType {
  item: UpdateRequestDoc;
}

const UpdateRequestBox = ({ item }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newRequestText, setNewRequestText] = useState(item.request);
  const [showingGuide, setShowingGuide] = useState(false);

  const onDeleteClick = async (id: string) => {
    const RequestRef = doc(dbService, "Update Request", `${id}`);
    await deleteDoc(RequestRef);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRequestRef = doc(dbService, "Update Request", `${item.id}`);
    await updateDoc(newRequestRef, { request: newRequestText });
    if (newRequestText === "") {
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
    setNewRequestText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <Request>
      {editing ? (
        <form onSubmit={onSubmit}>
          <div>
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
          </div>
          <textarea
            placeholder="수정해주세요."
            value={newRequestText}
            onChange={onChange}
          />
        </form>
      ) : (
        <form>
          <div>
            <UserInfoBox creatorId={item.creatorId} />
            <EditDeleteDoc
              creatorId={item.creatorId}
              onDeleteClick={() => onDeleteClick(item.id)}
              toggleEditing={toggleEditing}
            />
          </div>
          <p>
            <span className={item.type === "bug" ? "bug" : ""}>
              {item.type}
            </span>
            {item.request}
          </p>
        </form>
      )}
      <span>{timestamp(item.createdAt)}</span>
    </Request>
  );
};

const Request = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  margin-top: 15px;
  padding: 0 10px 15px;
  position: relative;
  form {
    > div:first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    > p {
      margin: 10px 0;
      line-height: 1.6;
      > span {
        font-size: 12px;
        width: fit-content;
        border-radius: 30px;
        padding: 2px 10px;
        background-color: ${(props) => props.theme.text.lightBlue};
        color: ${(props) => props.theme.text.white};
        margin-right: 5px;
        &.bug {
          background-color: ${(props) => props.theme.container.orange};
        }
      }
    }
    > textarea {
      width: 100%;
      height: 80px;
      resize: none;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      &:focus {
        outline: none;
      }
    }
  }
  > span {
    font-size: 12px;
  }
  @media ${device.tablet} {
    margin-top: 20px;
    form {
      > div:first-child {
        margin-bottom: 15px;
      }
      > p {
        margin: 10px 0 5px;
        min-height: 60px;
        line-height: 1.6;
        > span {
          font-size: 14px;
          border-radius: 30px;
          padding: 4px 10px;
          margin-right: 8px;
        }
      }
      > textarea {
        font-size: 16px;
      }
    }
    > span {
      font-size: 14px;
    }
  }
`;

export default UpdateRequestBox;
