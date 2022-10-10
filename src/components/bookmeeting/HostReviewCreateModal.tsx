import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { SubmitBtn } from "theme/commonStyle";
import { IBookApi } from "data/bookAtom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import Overlay from "components/common/Overlay";
import useAddDoc from "hooks/useAddDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";

interface PropsType {
  docMonth: string;
  bookInfo: IBookApi;
}

const HostReviewCreateModal = ({ docMonth, bookInfo }: PropsType) => {
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const collectionName = `BookMeeting Info/${docMonth}/host review`;
  const userData = useRecoilValue(currentUserState);

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: bookInfo.title,
    thumbnail: bookInfo.thumbnail,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    text,
    setText,
    collectionName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onAddDocSubmit(event);
    if (setModalOpen) return setModalOpen(false);
  };

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <AddDoc>
        <span onClick={onModalClick}>
          <Add /> 발제자의 모임 정리 기록하기
        </span>
      </AddDoc>
      {modalOpen ? (
        <>
          <Overlay onModalClick={onModalClick} />
          <Form onSubmit={handleSubmit}>
            <h3>
              발제자의 정리 기록 작성하기 <Close onClick={onModalClick} />
            </h3>
            <textarea
              placeholder="발제자는 모임 후 모임에서 나눈 이야기를 자유롭게 작성해주세요."
              value={text}
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

const AddDoc = styled.div`
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

export default HostReviewCreateModal;
