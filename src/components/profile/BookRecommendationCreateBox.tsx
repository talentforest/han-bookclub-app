import styled from "styled-components";
import { ReactComponent as LinkIcon } from "assets/link.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { useState } from "react";
import { dbService, storageService } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { LogInUserInfo } from "components/App";

interface PropsType {
  loggedInUserObj: LogInUserInfo;
  uid: string;
}

const BookRecommendationCreateBox = ({ loggedInUserObj, uid }: PropsType) => {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") return;
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${loggedInUserObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    try {
      await addDoc(collection(dbService, "Recommened_Book"), {
        text: text,
        createdAt: Date.now(),
        creatorId: uid,
        attachmentUrl,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }

    setText("");
    setAttachment("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result as string);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment(null);

  return (
    <FileForm onSubmit={onSubmit}>
      <TextArea
        placeholder="추천하고 싶은 책을 작성해주세요"
        onChange={onChange}
        value={text}
      />
      <div>
        <input
          id="input-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <label htmlFor="input-file">
          <span>파일 찾기</span>
          <LinkIcon />
        </label>
        <span>이미지는 최대 한 장만 등록 가능합니다.</span>
      </div>
      {attachment && (
        <SubmmitedFile>
          <img src={attachment} alt="user file" />
          <button onClick={onClearAttachmentClick}>
            <CloseIcon />
          </button>
        </SubmmitedFile>
      )}
      <input type="submit" value="Upload" />
    </FileForm>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  border-radius: 5px;
  padding: 5px 10px;
  white-space: pre-wrap;
  &:focus {
    outline: none;
  }
`;

const FileForm = styled.form`
  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    input:first-child {
      display: none;
    }
    label {
      width: 100%;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      height: 30px;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${(props) => props.theme.text.gray};
      svg {
        width: 14px;
        height: 14px;
        fill: ${(props) => props.theme.text.gray};
      }
      span {
        font-size: 12px;
      }
    }
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.gray};
      margin-left: 7px;
    }
  }
  > input {
    cursor: pointer;
    background-color: transparent;
    color: ${(props) => props.theme.text.accent};
    border: none;
    width: 100%;
    margin: 5px 0;
    border-radius: 5px;
    font-size: 12px;
    height: 26px;
    background-color: ${(props) => props.theme.container.lightBlue};
  }
`;

const SubmmitedFile = styled.div`
  margin: 10px 0;
  display: flex;
  position: relative;
  width: fit-content;
  img {
    height: 60px;
    width: auto;
  }
  button {
    position: absolute;
    border: none;
    background-color: transparent;
    width: fit-content;
    right: -5px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default BookRecommendationCreateBox;
