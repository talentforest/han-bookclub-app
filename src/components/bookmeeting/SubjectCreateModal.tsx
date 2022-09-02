import { useState } from "react";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { Add, Close } from "@mui/icons-material";
import { IBookApi } from "data/bookAtom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import useAlertAskJoin from "hooks/useAlertAskJoin";
import Overlay from "components/common/Overlay";

interface PropsType {
  bookInfo: IBookApi;
  docMonth: string;
}

const SubjectCreateModal = ({ bookInfo, docMonth }: PropsType) => {
  const [subject, setSubject] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const { alertAskJoin } = useAlertAskJoin();

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  const addDocSubject = async () => {
    await addDoc(
      collection(dbService, `BookMeeting Info/${docMonth}/subjects`),
      {
        text: subject,
        createdAt: Date.now(),
        creatorId: userData.uid,
        title: bookInfo.title,
        thumbnail: bookInfo.thumbnail,
      }
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject === "") return;
    try {
      if (authService.currentUser.isAnonymous) {
        alertAskJoin();
      } else {
        addDocSubject();
      }
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
          <Overlay onModalClick={onModalClick} />
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
    font-size: 14px;
    color: ${(props) => props.theme.text.lightBlue};
  }
  span {
    width: fit-content;
    color: ${(props) => props.theme.text.accent};
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    svg {
      fill: ${(props) => props.theme.text.accent};
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }
  }
  @media ${device.tablet} {
    p {
      margin: 10px 0;
      font-size: 16px;
    }
    span {
      font-size: 18px;
      svg {
        fill: ${(props) => props.theme.text.accent};
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
    }
  }
`;

const Form = styled.form`
  z-index: 2;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  margin: 0 20px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.lightBlue};
  > h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    font-weight: 700;
    font-size: 17px;
    width: 100%;
    text-align: start;
    svg {
      cursor: pointer;
    }
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
  }
  > textarea {
    font-size: 16px;
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
  @media ${device.tablet} {
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    > h3 {
      font-size: 18px;
      svg {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }
    > div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    > textarea {
      width: 100%;
      min-height: 350px;
      border: none;
      border-radius: 5px;
      background-color: ${(props) => props.theme.container.default};
      margin: 10px 0 20px;
      padding: 10px;
      font-size: 18px;
      resize: none;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default SubjectCreateModal;
