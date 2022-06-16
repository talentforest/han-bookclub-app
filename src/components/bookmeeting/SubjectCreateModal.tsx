import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { Add, Close } from "@mui/icons-material";
import { BookDocument } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { thisYearMonth } from "util/constants";
import styled from "styled-components";

interface PropsType {
  bookInfo: BookDocument;
}

const SubjectCreateModal = ({ bookInfo }: PropsType) => {
  const [subject, setSubject] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (subject === "") return;
      await addDoc(
        collection(dbService, `BookMeeting Info/${thisYearMonth}/subjects`),
        {
          text: subject,
          createdAt: Date.now(),
          creatorId: userData.uid,
          title: bookInfo.title,
          thumbnail: bookInfo.thumbnail,
        }
      );
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setModalOpen(false);
    setSubject("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setSubject(event.currentTarget.value);
  };

  return (
    <>
      <AddSubject>
        <span onClick={onModalClick}>
          <Add /> 발제문 참여하기
        </span>
        <p>필수 발제자를 포함하여 누구나 참여 가능해요.</p>
      </AddSubject>
      {modalOpen ? (
        <>
          <Overlay onClick={onModalClick} />
          <Form onSubmit={onSubmit}>
            <h3>
              발제문 작성하기 <Close onClick={onModalClick} />
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
      ) : (
        <></>
      )}
    </>
  );
};

const AddSubject = styled.div`
  padding: 0 3px;
  p {
    margin: 4px 0px 0px 4px;
    font-size: 12px;
    color: ${(props) => props.theme.text.lightBlue};
  }
  span {
    width: fit-content;
    color: ${(props) => props.theme.text.accent};
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    svg {
      fill: ${(props) => props.theme.text.accent};
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

export const Overlay = styled.div`
  cursor: pointer;
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

export default SubjectCreateModal;
