import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { Close } from "@mui/icons-material";
import styled from "styled-components";
import { BookDocument } from "data/bookAtom";

interface PropsType {
  bookInfo: BookDocument;
  uid: string;
  setModalOpen: (modalOpen: boolean) => void;
}

const SubjectCreateBox = ({ bookInfo, uid, setModalOpen }: PropsType) => {
  const [subject, setSubject] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (subject === "") return;
      await addDoc(collection(dbService, "Book_Subjects"), {
        text: subject,
        createdAt: Date.now(),
        creatorId: uid,
        bookTitle: bookInfo.title,
        bookCover: bookInfo.thumbnail,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setModalOpen(false);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setSubject(event.currentTarget.value);
  };

  const onCloseClick = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Overlay onClick={onCloseClick} />
      <Form onSubmit={onSubmit}>
        <h3>
          발제문 작성하기 <Close onClick={onCloseClick} />
        </h3>
        <textarea
          placeholder="책을 읽으며 이야기하고 싶었던 주제들을 자유롭게 작성해주세요."
          value={subject}
          onChange={onChange}
        />
        <div>
          <SubmitBtn type="submit" value="남기기" />
        </div>
      </Form>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  padding-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.form`
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  > h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    text-align: start;
    svg {
      cursor: pointer;
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
