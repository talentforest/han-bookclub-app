import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import styled from "styled-components";
import { LogInUserInfo } from "components/App";

interface PropsType extends LogInUserInfo {
  setModalOpen: (modalOpen: boolean) => void;
}

const SubjectCreateBox = ({ uid, setModalOpen }: PropsType) => {
  const [subject, setSubject] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject === "") return;
    try {
      await addDoc(collection(dbService, "Book_Subjects"), {
        text: subject,
        createdAt: Date.now(),
        creatorId: uid,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setModalOpen(false);
    setSubject("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setSubject(event.currentTarget.value);
  };

  const onCloseClick = () => {
    setModalOpen(false);
  };

  return (
    <ModalBackground>
      <Form onSubmit={onSubmit}>
        <div>
          <h3>발제문 작성하기</h3>
          <CloseIcon
            role="button"
            onClick={onCloseClick}
            width="16"
            height="16"
          />
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
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  margin-left: -15px;
  padding-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 50px auto 10px;
  padding: 10px 15px;
  border-radius: 5px;
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
    width: 260px;
    min-height: 350px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.default};
    margin-bottom: 20px;
    padding: 10px;
    &:focus {
      outline: none;
    }
  }
`;

export default SubjectCreateBox;
