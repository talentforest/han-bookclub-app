import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";

const SubjectBox = () => {
  const [subject, setSubject] = useState("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject === "") return;
    try {
      const docRef = await addDoc(collection(dbService, "book_subjects"), {
        subject,
        createdAt: Date.now(),
      });
      console.log("Document written with ID:", docRef.id);
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
      <SubmitBtn type="submit" value="남기기" />
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.lightBlue};
`;

const Textarea = styled.textarea`
  width: 260px;
  min-height: 200px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  margin-bottom: 35px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.input`
  position: absolute;
  right: 15px;
  bottom: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 5px;
  cursor: pointer;
`;

export default SubjectBox;
