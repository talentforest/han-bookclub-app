import styled from "styled-components";
import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

interface PropsType {
  uid: string;
}

const BookRecomCreateBox = ({ uid }: PropsType) => {
  const [text, setText] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (text === "") return;
      await addDoc(collection(dbService, "Recommened_Book"), {
        text: text,
        createdAt: Date.now(),
        creatorId: uid,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setText("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <textarea
        placeholder="멤버들에게 인상깊게 읽은 책을 추천해주세요."
        onChange={onChange}
        value={text}
      />
      <input type="submit" value="추천하기" />
    </Form>
  );
};

const Form = styled.form`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  textarea {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: pre-wrap;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input {
    margin-top: 10px;
    border: none;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 12px;
  }
`;

export default BookRecomCreateBox;
