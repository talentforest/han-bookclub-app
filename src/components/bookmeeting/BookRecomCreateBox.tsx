import styled from "styled-components";
import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { BookDocument } from "data/bookAtom";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import { thisYearMonth } from "util/constants";

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
      await addDoc(
        collection(
          dbService,
          `BookMeeting Info/${thisYearMonth}/recommended book`
        ),
        {
          text: text,
          createdAt: Date.now(),
          creatorId: uid,
          title: thisMonthBook?.title,
          thumbnail: thisMonthBook?.thumbnail,
        }
      );
      setText("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <textarea
          placeholder="이달의 책과 관련하여 추천하고 싶은 책이나, 이달에 재미있게 읽었던 책을 작성해주세요."
          onChange={onChange}
          value={text}
        />
        <div>
          <BookTitleImgBox docData={thisMonthBook} smSize={"smSize"} />
          <input type="submit" value="추천하기" />
        </div>
      </Form>
    </>
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
    word-wrap: break-word;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    > div {
      margin: 0;
    }
    input {
      cursor: pointer;
      border: none;
      background-color: ${(props) => props.theme.container.blue};
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
      font-size: 12px;
      height: 30px;
    }
  }
`;

export default BookRecomCreateBox;
