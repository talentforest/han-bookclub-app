import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { Container, SubmitBtn } from "theme/globalStyle";
import { AuthUser } from "data/atom";
import { ReactComponent as CloseIcon } from "assets/close.svg";
import styled from "styled-components";

interface PropsType extends AuthUser {
  setModalOpen: (modalOpen: boolean) => void;
}

const SubjectCreateBox = ({ uid, setModalOpen }: PropsType) => {
  const [subject, setSubject] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject === "") return;
    try {
      await addDoc(collection(dbService, "bookSubjects"), {
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
    <NewContainer>
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
        <Textarea
          placeholder="책을 읽으며 이야기하고 싶었던 주제들을 자유롭게 작성해주세요."
          value={subject}
          onChange={onChange}
        />
        <div>
          <SubmitBtn type="submit" value="남기기" />
        </div>
      </Form>
    </NewContainer>
  );
};

const NewContainer = styled(Container)`
  height: 100vh;
  margin: -15px;
  width: 100%;
  position: absolute;
  top: -25px;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.form`
  top: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  margin: 220px auto 0;
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
`;

const Textarea = styled.textarea`
  width: 260px;
  min-height: 400px;
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
