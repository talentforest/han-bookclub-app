import styled from "styled-components";
import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { BookDocument } from "data/bookAtom";

interface PropsType {
  uid: string;
  thisMonthBook: BookDocument;
}

const BookRecomCreateBox = ({ uid, thisMonthBook }: PropsType) => {
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

  const Month = new Date().getMonth() + 1;

  return (
    <Form onSubmit={onSubmit}>
      <textarea
        placeholder={`${Month}월에 "${thisMonthBook?.title}" 이외에 읽은 책을 작성해주세요. 

아니면 추천하고 싶은 책을 작성해도 좋아요.`}
        onChange={onChange}
        value={text}
      />
      <Bottom>
        <div>
          <img src={thisMonthBook?.thumbnail} alt="Book_Image" />
          <h3>{thisMonthBook?.title}</h3>
        </div>
        <input type="submit" value="추천하기" />
      </Bottom>
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
    height: 90px;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: pre-wrap;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 30px;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
      margin-right: 10px;
    }
    h3 {
      font-size: 12px;
    }
  }
  input {
    border: none;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 12px;
    height: 30px;
  }
`;

export default BookRecomCreateBox;
