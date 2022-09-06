import { useState } from "react";
import { UpdateRequestDoc } from "util/getFirebaseDoc";
import { timestamp } from "util/timestamp";
import EditDeleteButton from "components/common/EditDeleteButton";
import UserInfoBox from "components/common/UserInfoBox";
import useEditDeleteDoc from "hooks/useEditDeleteDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  request: UpdateRequestDoc;
}

const UpdateRequestBox = ({ request }: PropsType) => {
  const [newText, setNewText] = useState(request.text);
  const [editing, setEditing] = useState(false);
  const collectionName = "Update Request";

  const { showingGuide, onNewTextSubmit, onDeleteClick, onNewTextChange } =
    useEditDeleteDoc({
      docId: request.id,
      newText,
      setNewText,
      collectionName,
      setEditing,
    });

  return (
    <Request>
      {editing ? (
        <form onSubmit={onNewTextSubmit}>
          <div>
            <UserInfoBox creatorId={request.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={request.creatorId}
              onDeleteClick={onDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </div>
          <textarea
            placeholder="수정해주세요."
            value={newText}
            onChange={onNewTextChange}
          />
        </form>
      ) : (
        <form>
          <div>
            <UserInfoBox creatorId={request.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={request.creatorId}
              onDeleteClick={onDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
          </div>
          <p>
            <span className={request.type === "bug" ? "bug" : ""}>
              {request.type}
            </span>
            {newText}
          </p>
        </form>
      )}
      <span>{timestamp(request.createdAt)}</span>
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
      font-size: 16px;
      > span {
        font-size: 14px;
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
      height: 100px;
      margin-top: 10px;
      resize: none;
      border-radius: 5px;
      font-size: 16px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      &:focus {
        outline: none;
      }
    }
  }
  > span {
    font-size: 14px;
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
