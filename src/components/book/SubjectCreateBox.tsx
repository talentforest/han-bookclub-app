import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { UserData } from "./SubjectBox";

import styled from "styled-components";
import { SubmitBtn } from "theme/globalStyle";

const SubjectCreateBox = ({ uid }: UserData) => {
  const [subject, setSubject] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject === "") return;
    try {
      const docRef = await addDoc(collection(dbService, "bookSubjects"), {
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
      <Textarea
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
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.lightBlue};
  > div {
    width: 100%;
    display: flex;
    justify-content: end;
  }
`;

const Textarea = styled.textarea`
  width: 260px;
  min-height: 200px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  margin-bottom: 10px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

export default SubjectCreateBox;
