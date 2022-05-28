import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import { LogInUserInfo } from "components/App";
import styled from "styled-components";

const SubjectCreateBox = ({ uid }: LogInUserInfo) => {
  const [subject, setSubject] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (subject === "") return;
      await addDoc(collection(dbService, "Book_Subjects"), {
        text: subject,
        createdAt: Date.now(),
        creatorId: uid,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setSubject("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setSubject(event.currentTarget.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <h3>발제문 작성하기</h3>
        <CloseIcon role="button" width="16" height="16" />
      </div>
      <textarea
        placeholder="책을 읽으며 이야기하고 싶었던 주제들을 자유롭게 작성해주세요."
        value={subject}
        onChange={onChange}
      />
      <div>
        <SubmitBtn type="submit" value="남기기" />
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  > div:first-child {
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    > h3 {
      font-weight: 700;
      font-size: 14px;
    }
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  > textarea {
    width: 100%;
    min-height: 350px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.default};
    margin-bottom: 10px;
    padding: 10px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`;

export default SubjectCreateBox;
